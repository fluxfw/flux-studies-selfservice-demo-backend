/** @typedef {import("../Port/DataService.mjs").DataService} DataService */

export class RandomSessionNumberCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {RandomSessionNumberCommand}
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
     * @returns {Promise<string>}
     */
    async randomSessionNumber() {
        return this.#data_service.randomIdentificationNumber();
    }
}
