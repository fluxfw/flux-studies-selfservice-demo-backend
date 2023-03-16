/** @typedef {import("../../../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("../../../../../flux-http-api/src/Server/HttpServerResponse.mjs").HttpServerResponse} HttpServerResponse */
/** @typedef {import("../../Request/Port/RequestService.mjs").RequestService} RequestService */

export class HandleApiRequestCommand {
    /**
     * @type {RequestService}
     */
    #request_service;

    /**
     * @param {RequestService} request_service
     * @returns {HandleApiRequestCommand}
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
     * @param {HttpServerRequest} request
     * @returns {HttpServerResponse | null}
     */
    async handleApiRequest(request) {
        if (request.url.pathname.startsWith("/api/back/") || request.url.pathname === "/api/back") {
            return this.#request_service.handleBackRequest(
                request
            );
        }

        if (request.url.pathname.startsWith("/api/get/") || request.url.pathname === "/api/get") {
            return this.#request_service.handleGetRequest(
                request
            );
        }

        if (request.url.pathname.startsWith("/api/layout/") || request.url.pathname === "/api/layout") {
            return this.#request_service.handleLayoutRequest(
                request
            );
        }

        if (request.url.pathname.startsWith("/api/logout/") || request.url.pathname === "/api/logout") {
            return this.#request_service.handleLogoutRequest(
                request
            );
        }

        if (request.url.pathname.startsWith("/api/menu/") || request.url.pathname === "/api/menu") {
            return this.#request_service.handleMenuRequest(
                request
            );
        }

        if (request.url.pathname.startsWith("/api/post/") || request.url.pathname === "/api/post") {
            return this.#request_service.handlePostRequest(
                request
            );
        }

        return null;
    }
}
