import SALUTATIONS from "../../../Adapter/Data/Salutation/salutations.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Salutation/Salutation.mjs").Salutation} Salutation */

export class GetSalutationsCommand {
    /**
     * @returns {GetSalutationsCommand}
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
     * @returns {Promise<Salutation[]>}
     */
    async getSalutations() {
        return structuredClone(SALUTATIONS);
    }
}
