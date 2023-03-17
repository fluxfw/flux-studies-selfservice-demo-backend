/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../Session/Session.mjs").Session} Session */

export class NewSessionCommand {
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
     * @returns {NewSessionCommand}
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
     * @param {string} identification_number
     * @returns {Promise<string>}
     */
    async newSession(identification_number) {
        const session_number = await this.#data_service.randomSessionNumber();

        this.#sessions.push({
            "session-number": session_number,
            "identification-number": identification_number
        });

        return session_number;
    }
}
