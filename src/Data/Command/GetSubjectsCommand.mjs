import SUBJECTS from "../Subject/subjects.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Subject/SubjectWithCombinations.mjs").SubjectWithCombinations} SubjectWithCombinations */

export class GetSubjectsCommand {
    /**
     * @returns {GetSubjectsCommand}
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
     * @returns {Promise<SubjectWithCombinations[]>}
     */
    async getSubjects() {
        return structuredClone(SUBJECTS);
    }
}
