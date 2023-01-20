import DEGREE_TITLES from "../../../Adapter/Data/DegreeTitle/degree-titles.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/DegreeTitle/DegreeTitle.mjs").DegreeTitle} DegreeTitle */

export class GetDegreeTitlesCommand {
    /**
     * @returns {GetDegreeTitlesCommand}
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
     * @returns {Promise<DegreeTitle[]>}
     */
    async getDegreeTitles() {
        return structuredClone(DEGREE_TITLES);
    }
}
