import {QuoteObject} from "../typings/QuoteObject";

class Book implements QuoteObject {
    readonly author: string;
    readonly title: string;

    constructor() {
        this.author = document.getElementsByClassName("author")[0].innerHTML;
        this.title = document.getElementsByClassName("title")[0].innerHTML;
    }

    generateQuote(): HTMLElement {
        console.log(this.author, this.title);
        return undefined;
    }

}

export default Book;
