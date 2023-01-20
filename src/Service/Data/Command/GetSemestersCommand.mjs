import SEMESTERS from "../../../Adapter/Data/Semester/semesters.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */

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
