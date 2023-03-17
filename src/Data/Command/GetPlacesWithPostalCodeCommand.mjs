import PLACES from "../Place/places.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Place/PlaceWithPostalCode.mjs").PlaceWithPostalCode} PlaceWithPostalCode */

export class GetPlacesWithPostalCodeCommand {
    /**
     * @returns {GetPlacesWithPostalCodeCommand}
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
     * @returns {Promise<PlaceWithPostalCode[]>}
     */
    async getPlacesWithPostalCode() {
        return structuredClone(PLACES);
    }
}
