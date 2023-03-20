/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../Session/Session.mjs").Session} Session */

export class GetApplicationBySessionNumberCommand {
    /**
     * @type {DataService}
     */
    #data_service;
    /**
     * @type {Session[]}}
     */
    #sessions;

    /**
     * @param {DataService} data_service
     * @param {Session[]} sessions
     * @returns {GetApplicationBySessionNumberCommand}
     */
    static new(data_service, sessions) {
        return new this(
            data_service,
            sessions
        );
    }

    /**
     * @param {DataService} data_service
     * @param {Session[]} sessions
     * @private
     */
    constructor(data_service, sessions) {
        this.#data_service = data_service;
        this.#sessions = sessions;
    }

    /**
     * @param {string} session_number
     * @returns {Promise<Application | null>}
     */
    async getApplicationBySessionNumber(session_number) {
        const identification_number = this.#sessions.find(session => session["session-number"] === session_number)?.["identification-number"] ?? null;

        if (identification_number === null) {
            return null;
        }

        return this.#data_service.getApplicationByIdentificationNumber(
            identification_number
        );
    }
}
