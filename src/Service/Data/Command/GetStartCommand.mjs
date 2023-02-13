import START from "../../../Adapter/Data/Start/start.json" assert {type: "json"};

/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */

export class GetStartCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetStartCommand}
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
     * @returns {Promise<Start>}
     */
    async getStart() {
        return structuredClone({
            ...START,
            semesters: await this.#data_service.getSemesters()
        });
    }
}
