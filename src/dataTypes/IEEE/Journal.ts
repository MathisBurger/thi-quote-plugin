import {QuoteObject} from "../../typings/QuoteObject";
import DateUtil from "../../util/DateUtil";
import IeeeShared from "./IeeeShared";


/**
 * Journal or magazine on IEEE
 */
class Journal implements QuoteObject {

    /**
     * The author of a journal
     * @private
     */
    private readonly authors: string[];
    /**
     * The year of a journal
     * @private
     */
    private readonly year: string;
    /**
     * The title of a journal
     * @private
     */
    private readonly title: string;
    /**
     * The DOI of a journal
     * @private
     */
    private readonly doi: string;
    /**
     * The journal of a journal
     * @private
     */
    private readonly journalTitle: string;
    /**
     * The volume of a journal
     * @private
     */
    private readonly volume: string;
    /**
     * The issue of a journal
     * @private
     */
    private readonly issue: string;
    /**
     * The pages of a journal
     * @private
     */
    private readonly pages: string;

    constructor() {
        this.authors = IeeeShared.findAuthors();
        this.year = this.findYear();
        this.title = IeeeShared.findTitle();
        this.doi = IeeeShared.findDoi();
        this.journalTitle = (document.getElementsByClassName("stats-document-abstract-publishedIn")[0] as HTMLElement).innerText.split(": ")[1].split(" (")[0];
        this.volume = this.findKeyWord("Volume:");
        this.issue = this.findKeyWord("Issue:");
        this.pages = this.findPages();
    }

    /**
     * @inheritDoc
     */
    generateQuote(): string {
        return `${this.authors.join(", ")} (${this.year}) "${this.title}", <i>${this.journalTitle}</i>, vol. ${this.volume}, no. ${this.issue}, S. ${this.pages} [Online]. Verfügbar unter ${this.doi} (Abgerufen am ${DateUtil.getTodayDate()})`;
    }

    /**
     * Finds the year of a journal
     * @private
     */
    private findYear(): string {
        const spl = (document.getElementsByClassName("u-pb-1 doc-abstract-pubdate")[0] as HTMLElement).innerText.split(" ");
        while (spl[spl.length-1] === "") {
            spl.pop();
        }
        return spl[spl.length-1];
    }

    /**
     * Finds a string by keyword
     *
     * @param index The index string
     * @private
     */
    private findKeyWord(index: string): string {
        const txt = (document.getElementsByClassName("u-pb-1 stats-document-abstract-publishedIn")[0] as HTMLElement).innerText;
        let idx = txt.indexOf(index) + index.length;
        let str = "";
        while (txt.charAt(idx) !== "," && txt.charAt(idx) !== ")") {
            str += txt.charAt(idx);
            idx++;
        }
        return str.replace(" ", "");
    }

    /**
     * Finds the pages
     * @private
     */
    private findPages(): string {
        return (document.getElementsByClassName("row g-0 u-pt-1")[0] as HTMLElement).innerText.split("\n")[0].split(": ")[1]
    }

}

export default Journal;
