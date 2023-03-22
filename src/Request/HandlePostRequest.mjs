import { HttpServerResponse } from "../../../flux-http-api/src/Server/HttpServerResponse.mjs";
import { METHOD_POST } from "../../../flux-http-api/src/Method/METHOD.mjs";
import { STATUS_CODE_400 } from "../../../flux-http-api/src/Status/STATUS_CODE.mjs";

/** @typedef {import("../Data/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */
/** @typedef {import("../../../flux-http-api/src/Server/HttpServerRequest.mjs").HttpServerRequest} HttpServerRequest */

export class HandlePostRequest {
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
     * @returns {HandlePostRequest}
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
    async handlePostRequest(request) {
        if (request.url.pathname !== "/api/post") {
            return null;
        }

        const response = await this.#flux_http_api.validateMethods(
            request,
            [
                METHOD_POST
            ]
        );

        if (response !== null) {
            return response;
        }

        let post;
        try {
            post = await request.body.json();
        } catch (error) {
            console.error(error);

            return HttpServerResponse.text(
                "Invalid body",
                STATUS_CODE_400
            );
        }

        return (await import("./MapApiResponse.mjs")).MapApiResponse.new()
            .mapApiResponse(
                await this.#data_service.post(
                    post,
                    await (await import("./GetSessionNumberFromRequest.mjs")).GetSessionNumberFromRequest.new()
                        .getSessionNumberFromRequest(
                            request
                        )
                )
            );
    }
}
