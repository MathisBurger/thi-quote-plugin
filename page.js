const updateCallback = (response) => {
    document.getElementById("thi-quote-display").innerHTML = response.text;
}

document.getElementById('generateBtn').onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    for (const pass of [1, 2]) {
        try {
            await chrome.tabs.sendMessage(tab.id, {focusPointsInMilliseconds: 1000}, updateCallback);
            break;
        } catch (err) {
            await chrome.scripting.executeScript({target: {tabId}, files: ['dist/main.js']})
        }
    }
};
