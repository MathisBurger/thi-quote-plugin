import Book from "./dataTypes/Book";
import {QuoteObject} from "./typings/QuoteObject";
import tabId = chrome.devtools.inspectedWindow.tabId;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let quoteObject: QuoteObject = null;
    switch (location.origin) {
        case "https://opac-ku-de.thi.idm.oclc.org":
            quoteObject = new Book();
            break;
    }

    if (quoteObject) {
        sendResponse({text: quoteObject.generateQuote()});
    }
});
