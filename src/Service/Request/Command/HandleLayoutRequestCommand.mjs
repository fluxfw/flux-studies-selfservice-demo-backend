import { METHOD_GET, METHOD_HEAD, METHOD_OPTIONS } from "../../../../../flux-http-api/src/Method/METHOD.mjs";

/** @typedef {import("../../Data/Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */
/** @typedef {import("../../../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("../../../../../flux-http-api/src/Server/HttpServerResponse.mjs").HttpServerResponse} HttpServerResponse */
/** @typedef {import("../../Request/Port/RequestService.mjs").RequestService} RequestService */

export class HandleLayoutRequestCommand {
    /**
     * @type {DataService}
     */
    #data_service;
    /**
     * @type {FluxHttpApi}
     */
    #flux_http_api;
    /**
     * @type {RequestService}
     */
    #request_service;

    /**
     * @param {DataService} data_service
     * @param {FluxHttpApi} flux_http_api
     * @param {RequestService} request_service
     * @returns {HandleLayoutRequestCommand}
     */
    static new(data_service, flux_http_api, request_service) {
        return new this(
            data_service,
            flux_http_api,
            request_service
        );
    }

    /**
     * @param {DataService} data_service
     * @param {FluxHttpApi} flux_http_api
     * @param {RequestService} request_service
     * @private
     */
    constructor(data_service, flux_http_api, request_service) {
        this.#data_service = data_service;
        this.#flux_http_api = flux_http_api;
        this.#request_service = request_service;
    }

    /**
     * @param {HttpServerRequest} request
     * @returns {HttpServerResponse | null}
     */
    async handleLayoutRequest(request) {
        if (request.url.pathname !== "/api/layout") {
            return null;
        }

        const response = await this.#flux_http_api.validateMethods(
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

        return this.#request_service.mapApiResponse(
            await this.#data_service.layout()
        );
    }
}
