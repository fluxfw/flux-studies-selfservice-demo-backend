/** @typedef {import("../../../Adapter/Session/Session.mjs").Session} Session */

export class RemoveSessionCommand {
    /**
     * @type {Session[]}}
     */
    #sessions;

    /**
     * @param {Session[]} sessions
     * @returns {RemoveSessionCommand}
     */
    static new(sessions) {
        return new this(
            sessions
        );
    }

    /**
     * @param {Session[]} sessions
     * @private
     */
    constructor(sessions) {
        this.#sessions = sessions;
    }

    /**
     * @param {string} session_number
     * @returns {Promise<void>}
     */
    async removeSession(session_number) {
        const index = this.#sessions.findIndex(session => session["session-number"] === session_number);

        if (index !== -1) {
            this.#sessions.splice(index, 1);
        }
    }
}
