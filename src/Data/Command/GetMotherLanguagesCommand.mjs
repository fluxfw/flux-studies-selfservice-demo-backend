import MOTHER_LANGUAGE from "../MotherLanguage/mother-languages.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/MotherLanguage/MotherLanguage.mjs").MotherLanguage} MotherLanguage */

export class GetMotherLanguagesCommand {
    /**
     * @returns {GetMotherLanguagesCommand}
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
     * @returns {Promise<MotherLanguage[]>}
     */
    async getMotherLanguages() {
        return structuredClone(MOTHER_LANGUAGE);
    }
}
