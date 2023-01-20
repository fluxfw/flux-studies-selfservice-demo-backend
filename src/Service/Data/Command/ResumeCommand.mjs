import { PAGE_CREATE, PAGE_RESUME } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Resume/Resume.mjs").Resume} Resume */

export class ResumeCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ResumeCommand}
     */
    static new(data_service) {
        return new this(
            data_service
        );
    }

    /**
     * @param {DataService} data_service
     * @private
     */
    constructor(data_service) {
        this.#data_service = data_service;
    }

    /**
     * @param {Post & {data: Resume}} post
     * @returns {Promise<string | false | Label[]>}
     */
    async resume(post) {
        if (post.page !== PAGE_RESUME) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const start = await this.#data_service.getStart();

        if (typeof post.data["identification-number"] !== "string") {
            return false;
        }
        if (post.data["identification-number"] === "") {
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

        const application = await this.#data_service.getApplicationByIdentificationNumber(
            post.data["identification-number"]
        );

        if (application === null) {
            return false;
        }

        if (((await this.#data_service.getPost(
            application,
            PAGE_CREATE
        ))?.data.password ?? null) !== post.data.password) {
            return false;
        }

        return this.#data_service.newSession(
            application["identification-number"]
        );
    }
}
