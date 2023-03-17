/** @typedef {import("../../Application/Application.mjs").Application} Application */

export class GetApplicationByIdentificationNumberCommand {
    /**
     * @type {Application[]}}
     */
    #applications;

    /**
     * @param {Application[]} applications
     * @returns {GetApplicationByIdentificationNumberCommand}
     */
    static new(applications) {
        return new this(
            applications
        );
    }

    /**
     * @param {Application[]} applications
     * @private
     */
    constructor(applications) {
        this.#applications = applications;
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<Application | null>}
     */
    async getApplicationByIdentificationNumber(identification_number) {
        return this.#applications.find(application => application["identification-number"] === identification_number) ?? null;
    }
}
