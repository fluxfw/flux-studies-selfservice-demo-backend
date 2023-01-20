import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path/posix";
import { METHOD_GET, METHOD_HEAD, METHOD_OPTIONS } from "../../../../../flux-http-api/src/Adapter/Method/METHOD.mjs";

/** @typedef {import("../../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs").HttpApi} HttpApi */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Request/HttpRequest.mjs").HttpRequest} HttpRequest */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Response/HttpResponse.mjs").HttpResponse} HttpResponse */

const __dirname = dirname(fileURLToPath(import.meta.url));

export class HandleFrontendRequestCommand {
    /**
     * @type {HttpApi}
     */
    #http_api;

    /**
     * @param {HttpApi} http_api
     * @returns {HandleFrontendRequestCommand}
     */
    static new(http_api) {
        return new this(
            http_api
        );
    }

    /**
     * @param {HttpApi} http_api
     * @private
     */
    constructor(http_api) {
        this.#http_api = http_api;
    }

    /**
     * @param {HttpRequest} request
     * @returns {HttpResponse}
     */
    async handleFrontendRequest(request) {
        const response = await this.#http_api.validateMethods(
            request,
            [
                METHOD_GET,
                METHOD_HEAD,
                METHOD_OPTIONS
            ]
        );

        if (response !== null) {
            return response;
        }

        return this.#http_api.getFilteredStaticFileResponse(
            join(__dirname, "..", "..", "..", "..", "..", "flux-studis-selfservice-frontend", "src"),
            request.url.pathname,
            request
        );
    }
}
