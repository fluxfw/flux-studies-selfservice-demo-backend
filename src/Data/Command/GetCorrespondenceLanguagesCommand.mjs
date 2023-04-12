import CORRESPONDENCE_LANGUAGE from "../CorrespondenceLanguage/correspondence-languages.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/CorrespondenceLanguage/CorrespondenceLanguage.mjs").CorrespondenceLanguage} CorrespondenceLanguage */

export class GetCorrespondenceLanguagesCommand {
    /**
     * @returns {GetCorrespondenceLanguagesCommand}
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
     * @returns {Promise<CorrespondenceLanguage[]>}
     */
    async getCorrespondenceLanguages() {
        return structuredClone(CORRESPONDENCE_LANGUAGE);
    }
}
