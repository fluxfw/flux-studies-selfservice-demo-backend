import LANGUAGES from "../../../Adapter/Data/Language/languages.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Language/Language.mjs").Language} Language */

export class GetLanguagesCommand {
    /**
     * @returns {GetLanguagesCommand}
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
     * @returns {Promise<Language[]>}
     */
    async getLanguages() {
        return structuredClone(LANGUAGES);
    }
}
