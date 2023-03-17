import SCHOOLS from "../School/schools.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/School/School.mjs").School} School */

export class GetSchoolsCommand {
    /**
     * @returns {GetSchoolsCommand}
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
     * @returns {Promise<School[]>}
     */
    async getSchools() {
        return structuredClone(SCHOOLS);
    }
}
