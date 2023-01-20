import LAYOUT from "../../../Adapter/Data/Layout/layout.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Layout/Layout.mjs").Layout} Layout */

export class GetLayoutCommand {
    /**
     * @returns {GetLayoutCommand}
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
     * @returns {Promise<Layout[]>}
     */
    async getLayout() {
        return structuredClone(LAYOUT);
    }
}
