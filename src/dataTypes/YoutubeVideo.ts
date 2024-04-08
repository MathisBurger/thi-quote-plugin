import {QuoteObject} from "../typings/QuoteObject";
import DateUtil from "../util/DateUtil";


class YoutubeVideo implements QuoteObject {

    private readonly title: string;
    private readonly year: string;
    private readonly author: string;
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


    generateQuote(): string {
        return `<i>${this.title}</i> (${this.year}) YouTube Video, hinzugefügt von ${this.author} [Online]. Verfügbar unter ${this.url} (Abgerufen am ${DateUtil.getTodayDate()}).`;
    }

}

export default YoutubeVideo;
