import { COOKIE_SESSION_NUMBER } from "../Response/COOKIE.mjs";
import { HttpServerResponse } from "../../../flux-http-api/src/Server/HttpServerResponse.mjs";

/** @typedef {import("../Response/ApiResponse.mjs").ApiResponse} ApiResponse */

export class MapApiResponse {
    /**
     * @returns {MapApiResponse}
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
     * @param {ApiResponse} api_response
     * @returns {Promise<HttpServerResponse>}
     */
    async mapApiResponse(api_response) {
        const cookies = api_response["session-number"] === false ? {
            [COOKIE_SESSION_NUMBER]: null
        } : api_response["session-number"] !== null ? {
            [COOKIE_SESSION_NUMBER]: api_response["session-number"]
        } : null;

        return (api_response.data ?? null) !== null ? HttpServerResponse.json(
            api_response.data,
            null,
            null,
            cookies
        ) : HttpServerResponse.new(
            null,
            null,
            null,
            cookies
        );
    }
}
