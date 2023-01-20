import { CONFIG_ENV_PREFIX } from "../Config/CONFIG.mjs";
import { SERVER_CONFIG_HTTPS_CERT_KEY, SERVER_CONFIG_HTTPS_DHPARAM_KEY, SERVER_CONFIG_HTTPS_KEY_KEY, SERVER_CONFIG_LISTEN_HTTP_PORT_KEY, SERVER_CONFIG_LISTEN_HTTPS_PORT_KEY, SERVER_CONFIG_LISTEN_INTERFACE_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_PORT_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_KEY } from "../Server/SERVER_CONFIG.mjs";
import { SERVER_DEFAULT_LISTEN_HTTP_PORT, SERVER_DEFAULT_LISTEN_HTTPS_PORT, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE } from "../../../../flux-http-api/src/Adapter/Server/SERVER.mjs";

/** @typedef {import("../../../../flux-config-api/src/Adapter/Api/ConfigApi.mjs").ConfigApi} ConfigApi */
/** @typedef {import("../../Service/Data/Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs").HttpApi} HttpApi */
/** @typedef {import("../../Service/Request/Port/RequestService.mjs").RequestService} RequestService */
/** @typedef {import("../../../../flux-shutdown-handler-api/src/Adapter/ShutdownHandler/ShutdownHandler.mjs").ShutdownHandler} ShutdownHandler */

export class StudisSelfserviceDemoBackendApi {
    /**
     * @type {ConfigApi | null}
     */
    #config_api = null;
    /**
     * @type {DataService | null}
     */
    #data_service = null;
    /**
     * @type {HttpApi | null}
     */
    #http_api = null;
    /**
     * @type {RequestService | null}
     */
    #request_service = null;
    /**
     * @type {ShutdownHandler}
     */
    #shutdown_handler;

    /**
     * @param {ShutdownHandler} shutdown_handler
     * @returns {StudisSelfserviceDemoBackendApi}
     */
    static new(shutdown_handler) {
        return new this(
            shutdown_handler
        );
    }

    /**
     * @param {ShutdownHandler} shutdown_handler
     * @private
     */
    constructor(shutdown_handler) {
        this.#shutdown_handler = shutdown_handler;
    }

    /**
     * @returns {Promise<void>}
     */
    async runServer() {
        const config_api = await this.#getConfigApi();

        await (await this.#getHttpApi()).runServer(
            async request => (await this.#getRequestService()).handleRequest(
                request
            ),
            {
                https_cert: await config_api.getConfig(
                    SERVER_CONFIG_HTTPS_CERT_KEY
                ),
                https_dhparam: await config_api.getConfig(
                    SERVER_CONFIG_HTTPS_DHPARAM_KEY
                ),
                https_key: await config_api.getConfig(
                    SERVER_CONFIG_HTTPS_KEY_KEY
                ),
                listen_http_port: await config_api.getConfig(
                    SERVER_CONFIG_LISTEN_HTTP_PORT_KEY,
                    SERVER_DEFAULT_LISTEN_HTTP_PORT
                ),
                listen_https_port: await config_api.getConfig(
                    SERVER_CONFIG_LISTEN_HTTPS_PORT_KEY,
                    SERVER_DEFAULT_LISTEN_HTTPS_PORT
                ),
                listen_interface: await config_api.getConfig(
                    SERVER_CONFIG_LISTEN_INTERFACE_KEY
                ),
                redirect_http_to_https: await config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_KEY,
                    SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS
                ),
                redirect_http_to_https_port: await config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_PORT_KEY,
                    SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT
                ),
                redirect_http_to_https_status_code: await config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_KEY,
                    SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE
                )
            }
        );
    }

    /**
     * @returns {Promise<ConfigApi>}
     */
    async #getConfigApi() {
        this.#config_api ??= (await import("../../../../flux-config-api/src/Adapter/Api/ConfigApi.mjs")).ConfigApi.new(
            await (await import("../../../../flux-config-api/src/Adapter/ValueProviderImplementation/getValueProviderImplementations.mjs")).getValueProviderImplementations(
                CONFIG_ENV_PREFIX
            )
        );

        return this.#config_api;
    }

    /**
     * @returns {Promise<DataService>}
     */
    async #getDataService() {
        this.#data_service ??= (await import("../../Service/Data/Port/DataService.mjs")).DataService.new();

        return this.#data_service;
    }

    /**
     * @returns {Promise<HttpApi>}
     */
    async #getHttpApi() {
        this.#http_api ??= (await import("../../../../flux-http-api/src/Adapter/Api/HttpApi.mjs")).HttpApi.new(
            this.#shutdown_handler
        );

        return this.#http_api;
    }

    /**
     * @returns {Promise<RequestService>}
     */
    async #getRequestService() {
        this.#request_service ??= (await import("../../Service/Request/Port/RequestService.mjs")).RequestService.new(
            await this.#getDataService(),
            await this.#getHttpApi()
        );

        return this.#request_service;
    }
}
