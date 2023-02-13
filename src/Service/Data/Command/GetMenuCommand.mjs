import { MENU_ID_APPLICATION_LOGIN } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Menu/MENU_ID.mjs";

/** @typedef {import("../../../Adapter/Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Menu/Menu.mjs").Menu} Menu */

export class GetMenuCommand {
    /**
     * @returns {GetMenuCommand}
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
     * @param {Application | null} application
     * @returns {Promise<Menu>}
     */
    async getMenu(application = null) {
        return {
            ids: [
                MENU_ID_APPLICATION_LOGIN
            ],
            id: application?.menu ?? MENU_ID_APPLICATION_LOGIN
        };
    }
}
