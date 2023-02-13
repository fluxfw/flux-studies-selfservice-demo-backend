import { MENU_ID_APPLICATION_LOGIN } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Menu/MENU_ID.mjs";
import { PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../../../Adapter/Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Create/Create.mjs").Create} Create */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */

export class CreateCommand {
    /**
     * @type {Application[]}}
     */
    #applications;
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @param {Application[]} applications
     * @returns {CreateCommand}
     */
    static new(data_service, applications) {
        return new this(
            data_service,
            applications
        );
    }

    /**
     * @param {DataService} data_service
     * @param {Application[]} applications
     * @private
     */
    constructor(data_service, applications) {
        this.#data_service = data_service;
        this.#applications = applications;
    }

    /**
     * @param {Post & {data: Create}} post
     * @returns {Promise<string | false | Label[]>}
     */
    async create(post) {
        if (post.page !== PAGE_CREATE) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const start = await this.#data_service.getStart();

        if (typeof post.data.semester !== "string") {
            return false;
        }
        if (post.data.semester === "") {
            return false;
        }
        if (!start.semesters.some(semester => semester.id === post.data.semester)) {
            return false;
        }

        if (typeof post.data.password !== "string") {
            return false;
        }
        if (post.data.password === "") {
            return false;
        }
        if (post.data.password.length < start["min-password-length"]) {
            return false;
        }

        if (typeof post.data["confirm-password"] !== "string") {
            return false;
        }
        if (post.data["confirm-password"] === "") {
            return false;
        }
        if (post.data["confirm-password"].length < start["min-password-length"]) {
            return false;
        }

        if (post.data.password !== post.data["confirm-password"]) {
            return false;
        }

        const application = {
            "identification-number": await this.#data_service.randomIdentificationNumber(),
            menu: MENU_ID_APPLICATION_LOGIN,
            page: PAGE_IDENTIFICATION_NUMBER,
            posts: []
        };

        this.#applications.push(application);

        await this.#data_service.addPost(
            application,
            post
        );

        return this.#data_service.newSession(
            application["identification-number"]
        );
    }
}
