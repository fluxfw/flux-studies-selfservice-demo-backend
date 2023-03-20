import { PAGE_CHOICE_SUBJECT } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../DataService.mjs").DataService} DataService */

export class ShowPreviousStudiesPageCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ShowPreviousStudiesPageCommand}
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
     * @returns {Promise<boolean>}
     */
    async showPreviousStudiesPage(application) {
        return (await this.#data_service.getPost(
            application,
            PAGE_CHOICE_SUBJECT
        ))?.data?.qualifications?.already_studied ?? false;
    }
}
