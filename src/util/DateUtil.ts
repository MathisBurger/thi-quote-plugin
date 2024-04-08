/**
 * Util that handles all date actions
 */
class DateUtil {

    /**
     * Gets today date formatted as german date string.
     */
    public static getTodayDate(): string {
        const date = new Date();
        return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}.${date.getFullYear()}`;
    }
}

export default DateUtil;
