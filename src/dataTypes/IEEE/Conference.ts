import {QuoteObject} from "../../typings/QuoteObject";
import DateUtil from "../../util/DateUtil";
import IeeeShared from "./IeeeShared";


/**
 * Conference entry on IEEE
 */
class Conference implements QuoteObject {

    /**
     * All authors of the conference
     * @private
     */
    private readonly authors: string[];
    /**
     * Year of the conference
     * @private
     */
    private readonly year: string;
    /**
     * Title of the conference
     * @private
     */
    private readonly title: string;
    /**
     * The date of the conference
     * @private
     */
    private readonly date: string;
    /**
     * The location of the conference
     * @private
     */
    private readonly location: string;
    /**
     * The publisher of the document
     * @private
     */
    private readonly publisher: string;
    /**
     * The doi of the document
     * @private
     */
    private readonly doi: string;

    constructor() {
        this.authors = IeeeShared.findAuthors();
        this.year = this.findYear();
        this.title = IeeeShared.findTitle();
        this.date = (document.getElementsByClassName("u-pb-1 doc-abstract-confdate")[0] as HTMLElement).innerText.split(": ")[1];
        this.location = (document.getElementsByClassName("u-pb-1 doc-abstract-conferenceLoc")[0] as HTMLElement).innerText.split(": ")[1];
        this.publisher = IeeeShared.findPublisher();
        this.doi = IeeeShared.findDoi();
    }

    /**
     * @inheritDoc
     */
    generateQuote(): string {
        return `${this.authors.join(", ")} (${this.year}) "${this.title}", ${this.location}, ${this.date}. ${this.publisher} [Online]. Verfügbar unter ${this.doi} (Abgerufen am ${DateUtil.getTodayDate()})`;
    }

    /**
     * Finds the date of the conference
     * @private
     */
    private findYear(): string {
        const yearString = (document.getElementsByClassName("u-pb-1 doc-abstract-confdate")[0] as HTMLElement).innerText;
        const spl = yearString.split(" ");
        return spl[spl.length - 1];
    }

}

export default Conference;
