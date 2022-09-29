import { ASSERT_TYPE_JSON } from "../../../node_modules/flux-fetch-api/src/Adapter/AssertType/ASSERT_TYPE.mjs";
import { COOKIE_IDENTIFICATION_NUMBER } from "../Response/COOKIE.mjs";
import cookieParser from "cookie-parser";
import express from "express";
import { ExpressServerApi } from "../../../node_modules/flux-express-server-api/src/Adapter/Api/ExpressServerApi.mjs";
import { fileURLToPath } from "node:url";
import { MIN_PASSWORD_LENGTH } from "../Start/MIN_PASSWORD_LENGTH.mjs";
import { ShutdownHandler } from "../../../node_modules/flux-shutdown-handler-api/src/Adapter/ShutdownHandler/ShutdownHandler.mjs";
import { ShutdownHandlerApi } from "../../../node_modules/flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs";
import { dirname, join } from "node:path";
import { PAGE_CHOICE_SUBJECT, PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_RESUME, PAGE_START } from "../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IdentificationNumber/IdentificationNumber.mjs").IdentificationNumber} IdentificationNumber */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../Response/Response.mjs").Response} Response */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Semester/Semester.mjs").Semester} Semester */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Start/Start.mjs").Start} Start */
/** @typedef {import("../../../node_modules/flux-studies-selfservice-frontend/src/Adapter/Subject/Subject.mjs").Subject} Subject */

const __dirname = dirname(fileURLToPath(import.meta.url));

export class StudiesSelfserviceDemoBackendApi {
    /**
     * @type {Application[]}}
     */
    #applications;
    /**
     * @type {ExpressServerApi | null}
     */
    #express_server_api = null;
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
        this.#applications = [];
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
     * @param {Application} application
     * @param {Post} post
     * @returns {void}
     */
    #addPost(application, post) {
        const index = application.posts.findIndex(_post => _post.page === post.page);

        if (index !== -1) {
            application.posts[index] = post;
        } else {
            application.posts.push(post);
        }
    }

    /**
     * @param {Application | null} application
     * @returns {Promise<Response>}
     */
    async #back(application = null) {
        let identification_number = null;

        switch (application?.page ?? null) {
            case PAGE_INTENDED_DEGREE_PROGRAM:
                application.page = PAGE_CHOICE_SUBJECT;
                break;

            default:
                identification_number = false;
                break;
        }

        return {
            data: null,
            "identification-number": identification_number
        };
    }

    /**
     * @param {Post} post
     * @returns {Promise<string | false>}
     */
    async #create(post) {
        if (post.data.password.length < MIN_PASSWORD_LENGTH || post.data["confirm-password"].length < MIN_PASSWORD_LENGTH) {
            return false;
        }

        if (post.data.password !== post.data["confirm-password"]) {
            return false;
        }

        const application = {
            "identification-number": Math.random().toString(16).substring(2, 10),
            page: PAGE_IDENTIFICATION_NUMBER,
            posts: []
        };

        this.#applications.push(application);

        this.#addPost(
            application,
            post
        );

        return application["identification-number"];
    }

    /**
     * @param {Application | null} application
     * @returns {Promise<Response>}
     */
    async #get(application = null) {
        let page = application?.page ?? null;
        let data;
        let can_back = true;
        let identification_number = null;

        switch (page) {
            case PAGE_CHOICE_SUBJECT:
                data = await this.#importChoiceSubject(
                    this.#getPost(
                        application,
                        PAGE_CHOICE_SUBJECT
                    )?.data ?? null
                );
                can_back = false;
                break;

            case PAGE_IDENTIFICATION_NUMBER:
                data = await this.#importIdentificationNumber(
                    application["identification-number"]
                );
                can_back = false;
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM:
                data = await this.#importIntendedDegreeProgram(
                    this.#getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    )?.data ?? null
                );
                break;

            default:
                page = PAGE_START;
                data = await this.#importStart();
                can_back = false;
                identification_number = false;
                break;
        }

        return {
            data: {
                page,
                data,
                can_back
            },
            "identification-number": identification_number
        };
    }

    /**
     * @param {string | null} identification_number
     * @returns {Application | null}
     */
    #getApplication(identification_number = null) {
        if (identification_number === null) {
            return null;
        }

        return this.#applications.find(application => application["identification-number"] === identification_number) ?? null;
    }

    /**
     * @param {express.request} req
     * @returns {Application | null}
     */
    #getApplicationFromRequest(req) {
        return this.#getApplication(
            req.cookies[COOKIE_IDENTIFICATION_NUMBER] ?? null
        );
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
     * @param {Application} application
     * @param {string} page
     * @returns {Post | null}
     */
    #getPost(application, page) {
        return application.posts.find(post => post.page === page) ?? null;
    }

    /**
     * @returns {Promise<express.Router>}
     */
    async #getRouter() {
        const router = express.Router();

        router.use(cookieParser());

        router.post("/api/back", async (req, res) => {
            try {
                this.#response(
                    req,
                    res,
                    await this.#back(
                        this.#getApplicationFromRequest(
                            req
                        )
                    )
                );
            } catch (error) {
                console.error(error);

                res.status(500).end();
            }
        });

        router.get("/api/get", async (req, res) => {
            try {
                this.#response(
                    req,
                    res,
                    await this.#get(
                        this.#getApplicationFromRequest(
                            req
                        )
                    )
                );
            } catch (error) {
                console.error(error);

                res.status(500).end();
            }
        });

        router.post("/api/post", async (req, res) => {
            try {
                if ((req.body ?? null) === null) {
                    res.status(400).end();
                    return;
                }

                this.#response(
                    req,
                    res,
                    await this.#post(
                        req.body,
                        this.#getApplicationFromRequest(
                            req
                        )
                    )
                );
            } catch (error) {
                console.error(error);

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
     * @param {ChosenSubject | null} values
     * @returns {Promise<ChoiceSubject>}
     */
    async #importChoiceSubject(values = null) {
        return {
            ...(await import("../Data/ChoiceSubject/choice-subject.json", { assert: { type: ASSERT_TYPE_JSON } })).default,
            "degree-programs": await this.#importDegreePrograms(),
            values
        };
    }

    /**
     * @returns {Promise<DegreeProgram[]>}
     */
    async #importDegreePrograms() {
        return (await import("../Data/DegreeProgram/degree-programs.json", { assert: { type: ASSERT_TYPE_JSON } })).default;
    }

    /**
     * @param {string} identification_number
     * @returns {Promise<IdentificationNumber>}
     */
    async #importIdentificationNumber(identification_number) {
        return {
            ...(await import("../Data/IdentificationNumber/identification-number.json", { assert: { type: ASSERT_TYPE_JSON } })).default,
            "identification-number": identification_number
        };
    }

    /**
     * @param {ChosenIntendedDegreeProgram | null} values
     * @returns {Promise<IntendedDegreeProgram>}
     */
    async #importIntendedDegreeProgram(values = null) {
        return {
            ...(await import("../Data/IntendedDegreeProgram/intended-degree-program.json", { assert: { type: ASSERT_TYPE_JSON } })).default,
            subjects: await this.#importSubjects(),
            values
        };
    }

    /**
     * @returns {Promise<Semester[]>}
     */
    async #importSemesters() {
        return (await import("../Data/Semester/semesters.json", { assert: { type: ASSERT_TYPE_JSON } })).default;
    }

    /**
     * @returns {Promise<Start>}
     */
    async #importStart() {
        return {
            ...(await import("../Data/Start/start.json", { assert: { type: ASSERT_TYPE_JSON } })).default,
            semesters: await this.#importSemesters(),
            "min-password-length": MIN_PASSWORD_LENGTH
        };
    }

    /**
     * @returns {Promise<Subject[]>}
     */
    async #importSubjects() {
        return (await import("../Data/Subject/subjects.json", { assert: { type: ASSERT_TYPE_JSON } })).default;
    }

    /**
     * @param {Post} post
     * @param {Application | null} application
     * @returns {Promise<Response>}
     */
    async #post(post, application = null) {
        let ok = true;
        let identification_number = null;

        if (application !== null) {
            switch (post.page) {
                case PAGE_CHOICE_SUBJECT:
                    this.#addPost(
                        application,
                        post
                    );

                    application.page = PAGE_INTENDED_DEGREE_PROGRAM;
                    break;

                case PAGE_IDENTIFICATION_NUMBER:
                    application.page = PAGE_CHOICE_SUBJECT;
                    break;

                case PAGE_INTENDED_DEGREE_PROGRAM:
                    this.#addPost(
                        application,
                        post
                    );
                    break;

                default:
                    ok = false;
                    break;
            }
        } else {
            switch (post.page) {
                case PAGE_CREATE: {
                    const _identification_number = await this.#create(
                        post
                    );

                    if (_identification_number !== false) {
                        identification_number = _identification_number;
                    } else {
                        ok = false;
                    }
                }
                    break;

                case PAGE_RESUME: {
                    const _identification_number = await this.#resume(
                        post
                    );

                    if (_identification_number !== false) {
                        identification_number = _identification_number;
                    } else {
                        ok = false;
                    }
                }
                    break;

                default:
                    ok = false;
                    break;
            }
        }

        return {
            data: {
                ok
            },
            "identification-number": identification_number
        };
    }

    /**
     * @param {express.request} req
     * @param {express.response} res
     * @param {Response} response
     * @returns {void}
     */
    #response(req, res, response) {
        if (response["identification-number"] === false) {
            res.clearCookie(COOKIE_IDENTIFICATION_NUMBER);
        } else {
            if (response["identification-number"] !== null) {
                res.cookie(COOKIE_IDENTIFICATION_NUMBER, response["identification-number"], {
                    httpOnly: true,
                    secure: req.secure
                });
            }
        }

        res.json(response.data);
    }

    /**
     * @param {Post} post
     * @returns {Promise<string | false>}
     */
    async #resume(post) {
        if (post.data.password.length < MIN_PASSWORD_LENGTH) {
            return false;
        }

        const application = this.#getApplication(
            post.data["identification-number"]
        );

        if (application === null) {
            return false;
        }

        if ((this.#getPost(
            application,
            PAGE_CREATE
        )?.data.password ?? null) !== post.data.password) {
            return false;
        }

        return application["identification-number"];
    }
}
