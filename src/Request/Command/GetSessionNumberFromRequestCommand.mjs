import { COOKIE_SESSION_NUMBER } from "../../Response/COOKIE.mjs";

/** @typedef {import("../../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */

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
     * @param {HttpServerRequest} request
     * @returns {Promise<string | null>}
     */
    async getSessionNumberFromRequest(request) {
        return request.cookie(
            COOKIE_SESSION_NUMBER
        );
    }
}
