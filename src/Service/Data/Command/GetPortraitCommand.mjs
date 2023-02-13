import PORTRAIT from "../../../Adapter/Data/Portrait/portrait.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Portrait/ChosenPortrait.mjs").ChosenPortrait} ChosenPortrait */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Portrait/Portrait.mjs").Portrait} Portrait */

export class GetPortraitCommand {
    /**
     * @returns {GetPortraitCommand}
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
     * @param {ChosenPortrait | null} values
     * @returns {Promise<Portrait>}
     */
    async getPortrait(values = null) {
        return structuredClone({
            ...PORTRAIT,
            values
        });
    }
}
