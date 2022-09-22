import { createServer } from "node:http";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ELEMENT_ROOT, ELEMENT_START } from "../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Element/ELEMENT.mjs";

/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Element/ELEMENT.mjs").ELEMENT} ELEMENT */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Get/GetResult.mjs").GetResult} GetResult */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Post/PostResult.mjs").PostResult} PostResult */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */

const __dirname = dirname(fileURLToPath(import.meta.url));

export class StudiesSelfserviceDemoBackendApi {
    /**
     * @type {ELEMENT}
     */
    #previous_element;

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

    }

    /**
     * @returns {void>
     */
    runServer() {
        const server = express();

        const node_server = createServer(server);

        node_server.listen(8080);

        server.use(express.json());

        server.use("/flux-css-api", express.static(join(__dirname, "..", "..", "..", "node_modules", "flux-css-api")));
        server.use("/flux-fetch-api", express.static(join(__dirname, "..", "..", "..", "node_modules", "flux-fetch-api")));
        server.use("/flux-studies-selfservice-frontend", express.static(join(__dirname, "..", "..", "..", "node_modules", "flux-studies-selfservice-frontend")));

        server.get("/", (req, res) => {
            this.#previous_element = ELEMENT_ROOT;

            res.redirect(302, "flux-studies-selfservice-frontend/src");
        });

        server.get("/api/get", async (req, res) => {
            try {
                res.json(await this.#get());
            } catch (error) {
                console.error("GET", error);

                res.status(500).end();
            }
        });

        server.post("/api/post", (req, res) => {
            try {
                res.json(this.#post(
                    req.body
                ));
            } catch (error) {
                console.error("POST", error);

                res.status(500).end();
            }
        });
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
            case ELEMENT_ROOT:
                get_result = {
                    /**
                     * @type {Start}
                     */
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
     * @returns {Promise<Semester[]>}
     */
    async #importSemesters() {
        return (await import("../Data/semesters.json", { assert: { type: "json" } })).default;
    }

    /**
     * @returns {Promise<Start>}
     */
    async #importStart() {
        return {
            ...(await import("../Data/start.json", { assert: { type: "json" } })).default,
            semesters: await this.#importSemesters()
        };
    }

    /**
     * @param {Post} post
     * @returns {PostResult}
     */
    #post(post) {
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
