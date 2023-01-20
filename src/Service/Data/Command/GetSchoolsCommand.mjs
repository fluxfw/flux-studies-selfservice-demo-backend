import SCHOOLS from "../../../Adapter/Data/School/schools.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/School/School.mjs").School} School */

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
