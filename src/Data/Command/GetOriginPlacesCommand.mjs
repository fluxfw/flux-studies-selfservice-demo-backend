import ORIGIN_PLACES from "../OriginPlace/origin-places.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/OriginPlace/OriginPlace.mjs").OriginPlace} OriginPlace */

export class GetOriginPlacesCommand {
    /**
     * @returns {GetOriginPlacesCommand}
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
     * @returns {Promise<OriginPlace[]>}
     */
    async getOriginPlaces() {
        return structuredClone(ORIGIN_PLACES);
    }
}
