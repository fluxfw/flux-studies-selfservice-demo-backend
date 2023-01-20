import { COOKIE_SESSION_NUMBER } from "../../../Adapter/Response/COOKIE.mjs";
import { HttpResponse } from "../../../../../flux-http-api/src/Adapter/Response/HttpResponse.mjs";

/** @typedef {import("../../../Adapter/Response/ApiResponse.mjs").ApiResponse} ApiResponse */

export class MapApiResponseCommand {
    /**
     * @returns {MapApiResponseCommand}
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
     * @returns {Promise<HttpResponse>}
     */
    async mapApiResponse(api_response) {
        return HttpResponse.json(
            api_response.data,
            null,
            null,
            api_response["session-number"] === false ? {
                [COOKIE_SESSION_NUMBER]: null
            } : api_response["session-number"] !== null ? {
                [COOKIE_SESSION_NUMBER]: api_response["session-number"]
            } : null
        );
    }
}
