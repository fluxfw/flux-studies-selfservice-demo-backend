import { COOKIE_SESSION_NUMBER } from "../Response/COOKIE.mjs";

/** @typedef {import("../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */

export class GetSessionNumberFromRequest {
    /**
     * @returns {GetSessionNumberFromRequest}
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
