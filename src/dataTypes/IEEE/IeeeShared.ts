/**
 * Shared actions on IEEE
 */
class IeeeShared {

    /**
     * Finds the author
     */
    public static findAuthors(): string[] {
        let authors = [];
        const children = document.getElementsByClassName("authors-info-container overflow-ellipsis text-base-md-lh authors-minimized")[0].children;
        for (let i=0; i<children.length; i++) {
            const txt = (children[i].children[0].children[0].children[0] as HTMLElement).innerText;
            authors.push(IeeeShared.parseAuthor(txt));
        }
        return authors;
    }

    /**
     * Finds the title
     */
    public static findTitle(): string {
        return (document.getElementsByClassName("document-title text-2xl-md-lh")[0] as HTMLElement).innerText;
    }

    /**
     * Finds the DOI
     */
    public static findDoi(): string {
        return "https://doi.org/" + (document.getElementsByClassName("u-pb-1 stats-document-abstract-doi")[0] as HTMLElement).innerText.split(": ")[1];
    }

    /**
     * Finds the publisher
     */
    public static findPublisher(): string {
        return (document.getElementsByClassName("text-base-md-lh publisher-info-container black-tooltip")[0] as HTMLElement).innerText.split(": ")[1];
    }

    /**
     * Parses author name
     *
     * @param str The base string that should be parsed
     * @private
     */
    private static parseAuthor(str: string): string {
        const spl = str.split(".");
        const reArr = [spl[spl.length-1], spl.splice(0, spl.length-1).map(e => e+".").join("")];
        return reArr.join(", ");
    }
}

export default IeeeShared;
