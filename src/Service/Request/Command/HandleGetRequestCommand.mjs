import { METHOD_GET, METHOD_HEAD, METHOD_OPTIONS } from "../../../../../flux-http-api/src/Adapter/Method/METHOD.mjs";

/** @typedef {import("../../Data/Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs").HttpApi} HttpApi */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Request/HttpRequest.mjs").HttpRequest} HttpRequest */
/** @typedef {import("../../../../../flux-http-api/src/Adapter/Response/HttpResponse.mjs").HttpResponse} HttpResponse */
/** @typedef {import("../../Request/Port/RequestService.mjs").RequestService} RequestService */

export class HandleGetRequestCommand {
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
     * @returns {HandleGetRequestCommand}
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
     * @param {HttpRequest} request
     * @returns {HttpResponse | null}
     */
    async handleGetRequest(request) {
        if (request.url.pathname !== "/api/get") {
            return null;
        }

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

        return this.#request_service.mapApiResponse(
            await this.#data_service.get(
                await this.#request_service.getSessionNumberFromRequest(
                    request
                )
            )
        );
    }
}
