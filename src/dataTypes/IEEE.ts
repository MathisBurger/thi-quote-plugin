import {QuoteObject} from "../typings/QuoteObject";
import Conference from "./IEEE/Conference";
import Journal from "./IEEE/Journal";


/**
 * IEEE database support
 */
class IEEE implements QuoteObject {

    private readonly ieee: QuoteObject;

    constructor() {
        const isConference = document.getElementsByClassName("u-pb-1 doc-abstract-conferenceLoc").length > 0;
        if (isConference) {
            this.ieee = new Conference();
        } else {
            this.ieee = new Journal();
        }
    }

    /**
     * @inheritDoc
     */
    generateQuote(): string {
        return this.ieee.generateQuote();
    }

}

export default IEEE;
