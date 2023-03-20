/** @typedef {import("../../Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../DataService.mjs").DataService} DataService */

export class LogoutCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {LogoutCommand}
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
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async logout(session_number = null) {
        let response_session_number = null;

        if (session_number !== null) {
            response_session_number = false;

            await this.#data_service.removeSession(
                session_number
            );
        }

        return {
            data: null,
            "session-number": response_session_number
        };
    }
}
