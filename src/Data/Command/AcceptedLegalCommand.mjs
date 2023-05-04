import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Legal/AcceptedLegal.mjs").AcceptedLegal} AcceptedLegal */
/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class AcceptedLegalCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {AcceptedLegalCommand}
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
     * @param {Application} application
     * @param {Post & {data: AcceptedLegal}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async acceptedLegal(application, post) {
        if (application.page !== PAGE_LEGAL || post.page !== application.page) {
            return false;
        }

        if (post.data === null || typeof post.data !== "object") {
            return false;
        }

        const legal = await this.#data_service.getLegal(
            (await this.#data_service.getPost(
                application,
                PAGE_CHOICE_SUBJECT
            )).data,
            (await this.#data_service.getPost(
                application,
                PAGE_INTENDED_DEGREE_PROGRAM
            )).data,
            (await this.#data_service.getPost(
                application,
                PAGE_INTENDED_DEGREE_PROGRAM_2
            )).data
        );

        if (typeof post.data["not-disqualified"] !== "boolean") {
            return false;
        }
        if (!post.data["not-disqualified"]) {
            return false;
        }

        if (typeof post.data.agb !== "boolean") {
            return false;
        }
        if (!post.data.agb) {
            return false;
        }

        if (typeof post.data.complete !== "boolean") {
            return false;
        }
        if (!post.data.complete) {
            return false;
        }

        if (typeof post.data.comments !== "string") {
            return false;
        }
        if (post.data.comments.length > legal["max-comments-length"]) {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_COMPLETED;

        return true;
    }
}
