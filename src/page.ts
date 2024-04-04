import {Message} from "./typings/Message";

/**
 * Sets the quote from the response
 *
 * @param response The response
 */
const updateCallback = (response: Message) => {
    document.getElementById("thi-quote-display").innerHTML = response.text;
}

/**
 * Executed on every extension page focus.
 * This fetches the quote from the content script via chrome internal messages
 */
const exec = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    for (const pass of [1, 2]) {
        try {
            await chrome.scripting.executeScript({target: {tabId: tab.id}, files: ['dist/content_script.js']})
            await chrome.tabs.sendMessage(tab.id, "", updateCallback);
            break;
        } catch (err) {
            alert(err);
        }
    }
};
exec();
