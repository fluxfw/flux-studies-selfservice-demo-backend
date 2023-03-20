/** @typedef {import("../Data/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */
/** @typedef {import("../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("../../../flux-http-api/src/Server/HttpServerResponse.mjs").HttpServerResponse} HttpServerResponse */

export class HandleApiRequest {
    /**
     * @type {DataService}
     */
    #data_service;
    /**
     * @type {FluxHttpApi}
     */
    #flux_http_api;

    /**
     * @param {DataService} data_service
     * @param {FluxHttpApi} flux_http_api
     * @returns {HandleApiRequest}
     */
    static new(data_service, flux_http_api) {
        return new this(
            data_service,
            flux_http_api
        );
    }

    /**
     * @param {DataService} data_service
     * @param {FluxHttpApi} flux_http_api
     * @private
     */
    constructor(data_service, flux_http_api) {
        this.#data_service = data_service;
        this.#flux_http_api = flux_http_api;
    }

    /**
     * @param {HttpServerRequest} request
     * @returns {HttpServerResponse | null}
     */
    async handleApiRequest(request) {
        if (request.url.pathname.startsWith("/api/back/") || request.url.pathname === "/api/back") {
            return (await import("./HandleBackRequest.mjs")).HandleBackRequest.new(
                this.#data_service,
                this.#flux_http_api
            )
                .handleBackRequest(
                    request
                );
        }

        if (request.url.pathname.startsWith("/api/get/") || request.url.pathname === "/api/get") {
            return (await import("./HandleGetRequest.mjs")).HandleGetRequest.new(
                this.#data_service,
                this.#flux_http_api
            )
                .handleGetRequest(
                    request
                );
        }

        if (request.url.pathname.startsWith("/api/layout/") || request.url.pathname === "/api/layout") {
            return (await import("./HandleLayoutRequest.mjs")).HandleLayoutRequest.new(
                this.#data_service,
                this.#flux_http_api
            )
                .handleLayoutRequest(
                    request
                );
        }

        if (request.url.pathname.startsWith("/api/logout/") || request.url.pathname === "/api/logout") {
            return (await import("./HandleLogoutRequest.mjs")).HandleLogoutRequest.new(
                this.#data_service,
                this.#flux_http_api
            )
                .handleLogoutRequest(
                    request
                );
        }

        if (request.url.pathname.startsWith("/api/menu/") || request.url.pathname === "/api/menu") {
            return (await import("./HandleMenuRequest.mjs")).HandleMenuRequest.new(
                this.#data_service,
                this.#flux_http_api
            )
                .handleMenuRequest(
                    request
                );
        }

        if (request.url.pathname.startsWith("/api/post/") || request.url.pathname === "/api/post") {
            return (await import("./HandlePostRequest.mjs")).HandlePostRequest.new(
                this.#data_service,
                this.#flux_http_api
            )
                .handlePostRequest(
                    request
                );
        }

        return null;
    }
}
