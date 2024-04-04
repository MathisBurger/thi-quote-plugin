const updateCallback = (response) => {
    document.getElementById("thi-quote-display").innerHTML = response.text;
}

const exec = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    for (const pass of [1, 2]) {
        try {
            await chrome.scripting.executeScript({target: {tabId: tab.id}, files: ['dist/content_script.js']})
            await chrome.tabs.sendMessage(tab.id, {tabId: tab.id}, updateCallback);
            break;
        } catch (err) {
            alert(err);
        }
    }
};
exec();
