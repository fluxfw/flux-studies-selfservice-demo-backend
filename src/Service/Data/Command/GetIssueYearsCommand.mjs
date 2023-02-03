import { MAX_ISSUE_YEAR } from "../../../Adapter/Data/IssueYear/MAX_ISSUE_YEAR.mjs";
import { MIN_ISSUE_YEAR } from "../../../Adapter/Data/IssueYear/MIN_ISSUE_YEAR.mjs";

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/IssueYear/IssueYear.mjs").IssueYear} IssueYear */

export class GetIssueYearsCommand {
    /**
     * @returns {GetIssueYearsCommand}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @returns {Promise<IssueYear[]>}
     */
    async getIssueYears() {
        return Array.from({ length: MAX_ISSUE_YEAR - MIN_ISSUE_YEAR + 1 }).map((_, year) => ({
            id: `${year + MIN_ISSUE_YEAR}`
        }));
    }
}
