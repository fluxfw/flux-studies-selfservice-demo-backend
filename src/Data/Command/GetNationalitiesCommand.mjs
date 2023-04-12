import NATIONALITIES from "../Nationally/nationalities.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Nationally/Nationally.mjs").Nationally} Nationally */

export class GetNationalitiesCommand {
    /**
     * @returns {GetNationalitiesCommand}
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
     * @returns {Promise<Nationally[]>}
     */
    async getNationalities() {
        return structuredClone(NATIONALITIES);
    }
}
