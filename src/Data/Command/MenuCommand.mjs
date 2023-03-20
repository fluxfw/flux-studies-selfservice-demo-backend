import { MENU_ID_APPLICATION_LOGIN } from "../../../../flux-studis-selfservice-frontend/src/Menu/MENU_ID.mjs";

/** @typedef {import("../../Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../DataService.mjs").DataService} DataService */

export class MenuCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {MenuCommand}
     */
    static new(data_service) {
        return new this(
            data_service
        );
    }

    /**
     * @param {DataService} data_service
     * @private
     */
    constructor(data_service) {
        this.#data_service = data_service;
    }

    /**
     * @param {string} id
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async menu(id, session_number = null) {
        const application = session_number !== null ? await this.#data_service.getApplicationBySessionNumber(
            session_number
        ) : null;

        const menu = await this.#data_service.getMenu(
            application
        );

        if (typeof id === "string" && menu.ids.includes(id) && application !== null && application.menu !== id) {
            switch (id) {
                case MENU_ID_APPLICATION_LOGIN:
                    application.menu = id;
                    break;

                default:
                    break;
            }
        }

        return {
            data: null,
            "session-number": null
        };
    }
}
