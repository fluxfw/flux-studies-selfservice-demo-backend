import { ASSERT_TYPE_JSON } from "../../../node_modules/flux-fetch-api/src/Adapter/AssertType/ASSERT_TYPE.mjs";
import express from "express";
import { ExpressServerApi } from "../../../node_modules/flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs";
import { fileURLToPath } from "node:url";
import { ShutdownHandler } from "../../../node_modules/flux-shutdown-handler-api/src/Adapter/ShutdownHandler/ShutdownHandler.mjs";
import { ShutdownHandlerApi } from "../../../node_modules/flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs";
import { dirname, join } from "node:path";
import { ELEMENT_CHOICE_SUBJECT, ELEMENT_CREATE, ELEMENT_RESUME, ELEMENT_ROOT, ELEMENT_START } from "../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Element/ELEMENT.mjs";

/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Subject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Element/ELEMENT.mjs").ELEMENT} ELEMENT */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Get/GetResult.mjs").GetResult} GetResult */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Post/PostResult.mjs").PostResult} PostResult */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */

const __dirname = dirname(fileURLToPath(import.meta.url));

export class StudiesSelfserviceDemoBackendApi {
    /**
     * @type {ExpressServerApi | null}
     */
    #express_server_api = null;
    /**
     * @type {ELEMENT}
     */
    #previous_element;
    /**
     * @type {ShutdownHandler | null}
     */
    #shutdown_handler = null;
    /**
     * @type {ShutdownHandlerApi | null}
     */
    #shutdown_handler_api = null;

    /**
     * @returns {StudiesSelfserviceDemoBackendApi}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {
        this.#previous_element = ELEMENT_ROOT;
    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        this.#shutdown_handler_api ??= await this.#getShutdownHandlerApi();
        this.#shutdown_handler ??= this.#shutdown_handler_api.getShutdownHandler();

        this.#express_server_api ??= await this.#getExpressServerApi();
    }

    /**
     * @returns {Promise<void>}
     */
    async runServer() {
        await this.#express_server_api.runExpressServer(
            async () => this.#getRouter()
        );
    }

    /**
     * @returns {Promise<GetResult>}
     */
    async #get() {
        /**
         * @type {GetResult}
         */
        let get_result;

        switch (this.#previous_element) {
            case ELEMENT_CREATE:
            case ELEMENT_RESUME:
            case ELEMENT_START:
                get_result = {
                    data: await this.#importChoiceSubject(),
                    element: ELEMENT_CHOICE_SUBJECT
                };
                break;

            case ELEMENT_ROOT:
                get_result = {
                    data: await this.#importStart(),
                    element: ELEMENT_START
                };
                break;

            default:
                throw new Error(`Previous element ${this.#previous_element} is not supported`);
        }

        console.debug("GET", this.#previous_element, get_result);

        return get_result;
    }

    /**
     * @returns {Promise<ExpressServerApi>}
     */
    async #getExpressServerApi() {
        const express_server = ExpressServerApi.new(
            this.#shutdown_handler
        );

        await express_server.init();

        return express_server;
    }

    /**
     * @returns {Promise<express.Router>}
     */
    async #getRouter() {
        const router = express.Router();

        router.get("/api/get", async (req, res) => {
            try {
                res.json(await this.#get());
            } catch (error) {
                console.error("GET", error);

                res.status(500).end();
            }
        });

        router.post("/api/post", async (req, res) => {
            try {
                res.json(await this.#post(
                    req.body
                ));
            } catch (error) {
                console.error("POST", error);

                res.status(500).end();
            }
        });

        router.use("/", express.static(join(__dirname, "..", "..", "..", "node_modules", "flux-studies-selfservice-frontend", "src")));

        return router;
    }

    /**
     * @returns {Promise<ShutdownHandlerApi>}
     */
    async #getShutdownHandlerApi() {
        const shutdown_handler_api = ShutdownHandlerApi.new();

        await shutdown_handler_api.init();

        return shutdown_handler_api;
    }

    /**
     * @returns {Promise<ChoiceSubject>}
     */
    async #importChoiceSubject() {
        return {
            ...(await import("../Data/choice-subject.json", { assert: { type: ASSERT_TYPE_JSON } })).default,
            "degree-programs": await this.#importDegreePrograms()
        };
    }

    /**
     * @returns {Promise<DegreeProgram[]>}
     */
    async #importDegreePrograms() {
        return (await import("../Data/degree-programs.json", { assert: { type: ASSERT_TYPE_JSON } })).default;
    }

    /**
     * @returns {Promise<Semester[]>}
     */
    async #importSemesters() {
        return (await import("../Data/semesters.json", { assert: { type: ASSERT_TYPE_JSON } })).default;
    }

    /**
     * @returns {Promise<Start>}
     */
    async #importStart() {
        return {
            ...(await import("../Data/start.json", { assert: { type: ASSERT_TYPE_JSON } })).default,
            semesters: await this.#importSemesters()
        };
    }

    /**
     * @param {Post} post
     * @returns {Promise<PostResult>}
     */
    async #post(post) {
        this.#previous_element = post.element;

        /**
         * @type {PostResult}
         */
        const post_result = {
            ok: true
        };

        console.debug("POST", post, post_result);

        return post_result;
    }
}
