import CANTONS from "../Canton/cantons.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Canton/Canton.mjs").Canton} Canton */

export class GetCantonsCommand {
    /**
     * @returns {GetCantonsCommand}
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
     * @returns {Promise<Canton[]>}
     */
    async getCantons() {
        return structuredClone(CANTONS);
    }
}
