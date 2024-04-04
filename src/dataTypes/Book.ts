import {QuoteObject} from "../typings/QuoteObject";

class Book implements QuoteObject {
    readonly author: string[];
    readonly title: string;
    readonly releaseYear: string;
    readonly edition: string;
    readonly publisherLocation: string;
    readonly publisher: string;
    readonly isEBook: boolean;

    constructor() {
        this.author = this.getAuthors();
        this.title = this.getTitle();
        this.releaseYear = this.getTitleTableAttribute("Jahr").replace("[", "").replace("]", "");
        this.edition = this.getTitleTableAttribute("Ausgabe");
        this.publisherLocation = this.getTitleTableAttribute("Verlagsort");
        this.publisher = this.getTitleTableAttribute("Verlag");
        this.isEBook = this.getTitleTableAttribute("Erscheinungsform").indexOf("E-Book") > -1;
    }

    generateQuote(): string {
        if (this.edition === null) {
            return `${this.getAuthorString()} ${this.getHg()}(${this.releaseYear}) <i>${this.title}</i>${this.isEBook ? " [Online]" : ""}, ${this.publisherLocation}, ${this.publisher}. ${this.getAccessedAt()}`;
        } else {
            return `${this.getAuthorString()} ${this.getHg()}(${this.releaseYear}) <i>${this.title}</i>${this.isEBook ? " [Online]" : ""}, ${this.edition}, ${this.publisherLocation}, ${this.publisher}. ${this.getAccessedAt()}`;
        }
    }

    private getAccessedAt(): string {
        if (this.isEBook) {
            const doiLink = this.getTitleTableAttribute("DOI");
            const permaLink = this.getTitleTableAttribute("Permalink");
            const link = doiLink ? `https://doi.org/${doiLink}` : permaLink
            const date = new Date();
            const formattedDate = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}.${date.getFullYear()}`
            return `Verfügbar unter ${link} (Abgerufen am ${formattedDate}).`
        }
        return "";
    }

    private getAuthorString(): string {
        if (this.author.length === 1) {
            return this.author[0];
        } else if (this.author.length === 2) {
            return this.author.join(' und ');
        } else if (this.author.length === 3) {
            return this.author[0] + ", " + this.author[1] + " und " + this.author[2];
        } else if (this.author.length >= 4) {
            return this.author[0] + " et al.";
        }
    }

    private getHg(): string {
        if (this.author[0].endsWith("[Herausgeber]")) {
            return "(Hg.) ";
        }
        return "";
    }

    private getAuthors(): string[] {
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
