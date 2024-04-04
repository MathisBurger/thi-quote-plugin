import Book from "./dataTypes/Book";
import {QuoteObject} from "./typings/QuoteObject";
import {Message} from "./typings/Message";

/**
 * Default content fetch worker
 */
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    let quoteObject: QuoteObject = null;
    switch (location.origin) {
        case "https://opac-ku-de.thi.idm.oclc.org":
            quoteObject = new Book();
            break;
    }

    if (quoteObject) {
        sendResponse({text: quoteObject.generateQuote()} as Message);
    }
});
