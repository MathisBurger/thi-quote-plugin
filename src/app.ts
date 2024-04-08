import Book from "./dataTypes/Book";
import {QuoteObject} from "./typings/QuoteObject";
import {Message} from "./typings/Message";
import YoutubeVideo from "./dataTypes/YoutubeVideo";
import IEEE from "./dataTypes/IEEE";
/**
 * Default content fetch worker
 */
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    let quoteObject: QuoteObject = null;
    switch (location.origin) {
        case "https://opac-ku-de.thi.idm.oclc.org":
            quoteObject = new Book();
            break;
        case "https://youtube.com":
        case "https://www.youtube.com":
            quoteObject = new YoutubeVideo();
            break;
        case "https://ieeexplore-ieee-org.thi.idm.oclc.org":
            quoteObject = new IEEE();
            break;
    }

    if (quoteObject) {
        sendResponse({text: quoteObject.generateQuote()} as Message);
    }
});
