import SEMESTERS from "../Semester/semesters.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Semester/Semester.mjs").Semester} Semester */

export class GetSemestersCommand {
    /**
     * @returns {GetSemestersCommand}
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
     * @returns {Promise<Semester[]>}
     */
    async getSemesters() {
        return structuredClone(SEMESTERS);
    }
}
