/** @typedef {import("../../Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../DataService.mjs").DataService} DataService */

export class LayoutCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {LayoutCommand}
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
     * @returns {Promise<ApiResponse>}
     */
    async layout() {
        return {
            data: await this.#data_service.getLayout(),
            "session-number": null
        };
    }
}
