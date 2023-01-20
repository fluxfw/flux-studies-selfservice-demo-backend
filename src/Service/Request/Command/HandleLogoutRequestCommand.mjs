import { METHOD_OPTIONS, METHOD_POST } from "../../../../../flux-http-api/src/Adapter/Method/METHOD.mjs";

/** @typedef {import("../../Data/Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs").HttpApi} HttpApi */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Server/HttpServerResponse.mjs").HttpServerResponse} HttpServerResponse */
/** @typedef {import("../../Request/Port/RequestService.mjs").RequestService} RequestService */

export class HandleLogoutRequestCommand {
    /**
     * @type {DataService}
     */
    #data_service;
    /**
     * @type {HttpApi}
     */
    #http_api;
    /**
     * @type {RequestService}
     */
    #request_service;

    /**
     * @param {DataService} data_service
     * @param {HttpApi} http_api
     * @param {RequestService} request_service
     * @returns {HandleLogoutRequestCommand}
     */
    static new(data_service, http_api, request_service) {
        return new this(
            data_service,
            http_api,
            request_service
        );
    }

    /**
     * @param {DataService} data_service
     * @param {HttpApi} http_api
     * @param {RequestService} request_service
     * @private
     */
    constructor(data_service, http_api, request_service) {
        this.#data_service = data_service;
        this.#http_api = http_api;
        this.#request_service = request_service;
    }

    /**
     * @param {HttpServerRequest} request
     * @returns {HttpServerResponse | null}
     */
    async handleLogoutRequest(request) {
        if (request.url.pathname !== "/api/logout") {
            return null;
        }

        const response = await this.#http_api.validateMethods(
            request,
            [
                METHOD_OPTIONS,
                METHOD_POST
            ]
        );

        if (response !== null) {
            return response;
        }

        return this.#request_service.mapApiResponse(
            await this.#data_service.logout(
                await this.#request_service.getSessionNumberFromRequest(
                    request
                )
            )
        );
    }
}
