import {QuoteObject} from "../typings/QuoteObject";
import DateUtil from "../util/DateUtil";

/**
 * Youtube video page instance
 */
class YoutubeVideo implements QuoteObject {

    /**
     * Title of the video
     * @private
     */
    private readonly title: string;
    /**
     * Year of the video
     * @private
     */
    private readonly year: string;
    /**
     * Author of the video
     * @private
     */
    private readonly author: string;
    /**
     * The url of the video
     * @private
     */
    private readonly url: string;


    constructor() {
        (document.getElementsByClassName("button style-scope ytd-text-inline-expander")[1] as HTMLElement).click();
        this.title = (document.getElementsByTagName("h1")[1].children[0] as HTMLElement).innerText;
        const yearString = (document.getElementsByClassName("bold style-scope yt-formatted-string")[2] as HTMLElement).innerText;
        const yearSplit = yearString.split(".");
        this.year = yearSplit[yearSplit.length-1];
        this.author = (document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string")[0] as HTMLElement).innerText;
        this.url = location.href;
    }


    /**
     * @inheritDoc
     */
    generateQuote(): string {
        return `<i>${this.title}</i> (${this.year}) YouTube Video, hinzugefügt von ${this.author} [Online]. Verfügbar unter ${this.url} (Abgerufen am ${DateUtil.getTodayDate()}).`;
    }

}

export default YoutubeVideo;
