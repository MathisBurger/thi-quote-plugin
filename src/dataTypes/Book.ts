import {QuoteObject} from "../typings/QuoteObject";

class Book implements QuoteObject {
    readonly author: Author[];
    readonly title: string;
    readonly releaseYear: string;
    readonly edition: string;
    readonly publisherLocation: string;
    readonly publisher: string;

    constructor() {
        this.author = this.getAuthors();
        this.title = this.getTitle();
        this.releaseYear = this.getTitleTableAttribute("Jahr");
        this.edition = this.getTitleTableAttribute("Ausgabe");
        this.publisherLocation = this.getTitleTableAttribute("Verlagsort");
        this.publisher = this.getTitleTableAttribute("Verlag");
    }

    generateQuote(): string {
        if (this.edition === null) {
            return `${this.author.join(', ')} (${this.releaseYear}) <i>${this.title}</i>, ${this.publisherLocation}, ${this.publisher}`;
        } else {
            return `${this.author.join(', ')} (${this.releaseYear}) <i>${this.title}</i>, ${this.edition}, ${this.publisherLocation}, ${this.publisher}`;
        }
    }

    private getAuthors(): Author[] {
        let elements = document.getElementsByClassName("author")[0].children;
        let arr = [];
        for (let i=0; i<elements.length; i++) {
            let split = elements[i].innerHTML.split(". ");
            if (split.length === 1) {
                arr.push(split[0]);
            } else {
                arr.push(split.splice(0, 1).join('. ') + '.');
            }
        }
        return arr;
    }

    private getTitle(): string {
        return (document.getElementsByClassName("title")[0] as HTMLElement).innerText;
    }

    private getTitleTableAttribute(attr: string): string {
        let table = document
            .getElementsByClassName("titleinfo")[0]
            .children[0]
            .children;

        for (let i=0; i<table.length; i++) {
            let row = table[i].children;
            if (row.length === 2 && (row[0] as HTMLElement).innerText === `${attr}:`) {
                return (row[1] as HTMLElement).innerText;
            }
        }
        return null;
    }

}

export default Book;
