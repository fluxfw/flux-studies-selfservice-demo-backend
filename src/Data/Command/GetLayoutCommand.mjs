import LAYOUT from "../Layout/layout.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Layout/Layout.mjs").Layout} Layout */

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
     * @returns {Promise<Layout>}
     */
    async getLayout() {
        return structuredClone(LAYOUT);
    }
}
