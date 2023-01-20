import { COOKIE_SESSION_NUMBER } from "../../../Adapter/Response/COOKIE.mjs";

/** @typedef {import("../../../../../flux-http-api/src/Adapter/Request/HttpRequest.mjs").HttpRequest} HttpRequest */

export class GetSessionNumberFromRequestCommand {
    /**
     * @returns {GetSessionNumberFromRequestCommand}
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
     * @param {HttpRequest} request
     * @returns {Promise<string | null>}
     */
    async getSessionNumberFromRequest(request) {
        return request.cookie(
            COOKIE_SESSION_NUMBER
        );
    }
}
