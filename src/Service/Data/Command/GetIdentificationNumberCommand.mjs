import IDENTIFICATION_NUMBER from "../../../Adapter/Data/IdentificationNumber/identification-number.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */

export class GetIdentificationNumberCommand {
    /**
     * @returns {GetIdentificationNumberCommand}
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
     * @param {string} identification_number
     * @returns {Promise<IdentificationNumber>}
     */
    async getIdentificationNumber(identification_number) {
        return structuredClone({
            ...IDENTIFICATION_NUMBER,
            "identification-number": identification_number
        });
    }
}
