import { CONFIG_ENV_PREFIX } from "./Config/CONFIG.mjs";
import { SERVER_CONFIG_DISABLE_HTTP_IF_HTTPS_KEY, SERVER_CONFIG_HTTPS_CERTIFICATE_KEY, SERVER_CONFIG_HTTPS_DHPARAM_KEY, SERVER_CONFIG_HTTPS_KEY_KEY, SERVER_CONFIG_LISTEN_HTTP_PORT_KEY, SERVER_CONFIG_LISTEN_HTTPS_PORT_KEY, SERVER_CONFIG_LISTEN_INTERFACE_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_PORT_KEY, SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_KEY } from "./Server/SERVER_CONFIG.mjs";
import { SERVER_DEFAULT_DISABLE_HTTP_IF_HTTPS, SERVER_DEFAULT_LISTEN_HTTP_PORT, SERVER_DEFAULT_LISTEN_HTTPS_PORT, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT, SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE } from "../../flux-http-api/src/Server/SERVER.mjs";

/** @typedef {import("./Data/DataService.mjs").DataService} DataService */
/** @typedef {import("../../flux-config-api/src/FluxConfigApi.mjs").FluxConfigApi} FluxConfigApi */
/** @typedef {import("../../flux-http-api/src/FluxHttpApi.mjs").FluxHttpApi} FluxHttpApi */
/** @typedef {import("../../flux-shutdown-handler/src/FluxShutdownHandler.mjs").FluxShutdownHandler} FluxShutdownHandler */

export class FluxStudisSelfserviceDemoBackend {
    /**
     * @type {DataService | null}
     */
    #data_service = null;
    /**
     * @type {FluxConfigApi | null}
     */
    #flux_config_api = null;
    /**
     * @type {FluxHttpApi | null}
     */
    #flux_http_api = null;
    /**
     * @type {FluxShutdownHandler}
     */
    #flux_shutdown_handler;

    /**
     * @param {FluxShutdownHandler} flux_shutdown_handler
     * @returns {FluxStudisSelfserviceDemoBackend}
     */
    static new(flux_shutdown_handler) {
        return new this(
            flux_shutdown_handler
        );
    }

    /**
     * @param {FluxShutdownHandler} flux_shutdown_handler
     * @private
     */
    constructor(flux_shutdown_handler) {
        this.#flux_shutdown_handler = flux_shutdown_handler;
    }

    /**
     * @returns {Promise<void>}
     */
    async runServer() {
        const flux_config_api = await this.#getFluxConfigApi();

        await (await this.#getFluxHttpApi()).runServer(
            async request => (await import("./Request/HandleRequest.mjs")).HandleRequest.new(
                await this.#getDataService(),
                await this.#getFluxHttpApi()
            )
                .handleRequest(
                    request
                ),
            {
                disable_http_if_https: await flux_config_api.getConfig(
                    SERVER_CONFIG_DISABLE_HTTP_IF_HTTPS_KEY,
                    SERVER_DEFAULT_DISABLE_HTTP_IF_HTTPS
                ),
                https_certificate: await flux_config_api.getConfig(
                    SERVER_CONFIG_HTTPS_CERTIFICATE_KEY,
                    null,
                    false
                ),
                https_dhparam: await flux_config_api.getConfig(
                    SERVER_CONFIG_HTTPS_DHPARAM_KEY,
                    null,
                    false
                ),
                https_key: await flux_config_api.getConfig(
                    SERVER_CONFIG_HTTPS_KEY_KEY,
                    null,
                    false
                ),
                listen_http_port: await flux_config_api.getConfig(
                    SERVER_CONFIG_LISTEN_HTTP_PORT_KEY,
                    SERVER_DEFAULT_LISTEN_HTTP_PORT
                ),
                listen_https_port: await flux_config_api.getConfig(
                    SERVER_CONFIG_LISTEN_HTTPS_PORT_KEY,
                    SERVER_DEFAULT_LISTEN_HTTPS_PORT
                ),
                listen_interface: await flux_config_api.getConfig(
                    SERVER_CONFIG_LISTEN_INTERFACE_KEY,
                    null,
                    false
                ),
                redirect_http_to_https: await flux_config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_KEY,
                    SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS
                ),
                redirect_http_to_https_port: await flux_config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_PORT_KEY,
                    SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_PORT
                ),
                redirect_http_to_https_status_code: await flux_config_api.getConfig(
                    SERVER_CONFIG_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE_KEY,
                    SERVER_DEFAULT_REDIRECT_HTTP_TO_HTTPS_STATUS_CODE
                )
            }
        );
    }

    /**
     * @returns {Promise<DataService>}
     */
    async #getDataService() {
        this.#data_service ??= (await import("./Data/DataService.mjs")).DataService.new();

        return this.#data_service;
    }

    /**
     * @returns {Promise<FluxConfigApi>}
     */
    async #getFluxConfigApi() {
        this.#flux_config_api ??= (await import("../../flux-config-api/src/FluxConfigApi.mjs")).FluxConfigApi.new(
            await (await import("../../flux-config-api/src/getValueProviderImplementations.mjs")).getValueProviderImplementations(
                CONFIG_ENV_PREFIX
            )
        );

        return this.#flux_config_api;
    }

    /**
     * @returns {Promise<FluxHttpApi>}
     */
    async #getFluxHttpApi() {
        this.#flux_http_api ??= (await import("../../flux-http-api/src/FluxHttpApi.mjs")).FluxHttpApi.new(
            this.#flux_shutdown_handler
        );

        return this.#flux_http_api;
    }
}
