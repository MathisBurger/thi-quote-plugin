export interface QuoteObject {
    readonly author: string;
    readonly title: string;

    generateQuote(): HTMLElement;
}
