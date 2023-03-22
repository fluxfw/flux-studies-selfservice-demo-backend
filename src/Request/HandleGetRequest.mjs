import { METHOD_GET, METHOD_HEAD } from "../../../flux-http-api/src/Method/METHOD.mjs";

/** @typedef {import("../Data/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */
/** @typedef {import("../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("../../../flux-http-api/src/Server/HttpServerResponse.mjs").HttpServerResponse} HttpServerResponse */

export class HandleGetRequest {
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
     * @returns {HandleGetRequest}
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
    async handleGetRequest(request) {
        if (request.url.pathname !== "/api/get") {
            return null;
        }

        const response = await this.#flux_http_api.validateMethods(
            request,
            [
                METHOD_GET,
                METHOD_HEAD
            ]
        );

        if (response !== null) {
            return response;
        }

        return (await import("./MapApiResponse.mjs")).MapApiResponse.new()
            .mapApiResponse(
                await this.#data_service.get(
                    await (await import("./GetSessionNumberFromRequest.mjs")).GetSessionNumberFromRequest.new()
                        .getSessionNumberFromRequest(
                            request
                        )
                )
            );
    }
}
