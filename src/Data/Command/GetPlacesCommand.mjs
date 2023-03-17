/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Place/Place.mjs").Place} Place */

export class GetPlacesCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetPlacesCommand}
     */
    static new(data_service) {
        return new this(
            data_service
        );
    }

    /**
     * @param {DataService} data_service
     * @private
     */
    constructor(data_service) {
        this.#data_service = data_service;
    }

    /**
     * @returns {Promise<Place[]>}
     */
    async getPlaces() {
        return structuredClone((await this.#data_service.getPlacesWithPostalCode()).map(place => {
            const _place = structuredClone(place);
            delete _place["postal-code"];
            return _place;
        }));
    }
}
