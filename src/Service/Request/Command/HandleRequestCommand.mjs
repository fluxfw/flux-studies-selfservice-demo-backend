/** @typedef {import("../../../../../flux-http-api/src/Adapter/Request/HttpRequest.mjs").HttpRequest} HttpRequest */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Response/HttpResponse.mjs").HttpResponse} HttpResponse */
/** @typedef {import("../../Request/Port/RequestService.mjs").RequestService} RequestService */

export class HandleRequestCommand {
    /**
     * @type {RequestService}
     */
    #request_service;

    /**
     * @param {RequestService} request_service
     * @returns {HandleRequestCommand}
     */
    static new(request_service) {
        return new this(
            request_service
        );
    }

    /**
     * @param {RequestService} request_service
     * @private
     */
    constructor(request_service) {
        this.#request_service = request_service;
    }

    /**
     * @param {HttpRequest} request
     * @returns {HttpResponse | null}
     */
    async handleRequest(request) {
        if (request.url.pathname.startsWith("/api/") || request.url.pathname === "/api") {
            return this.#request_service.handleApiRequest(
                request
            );
        } else {
            return this.#request_service.handleFrontendRequest(
                request
            );
        }
    }
}
