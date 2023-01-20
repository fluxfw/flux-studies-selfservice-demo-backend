import { PAGE_CHOICE_SUBJECT, PAGE_IDENTIFICATION_NUMBER } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../../../Adapter/Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/IdentificationNumber/ConfirmedIdentificationNumber.mjs").ConfirmedIdentificationNumber} ConfirmedIdentificationNumber */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */

export class ConfirmedIdentificationNumberCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ConfirmedIdentificationNumberCommand}
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
     * @param {Post & {data: ConfirmedIdentificationNumber}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async confirmedIdentificationNumber(application, post) {
        if (application.page !== PAGE_IDENTIFICATION_NUMBER || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_CHOICE_SUBJECT;

        return true;
    }
}
