import { PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class ChosenUniversityEntranceQualificationCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ChosenUniversityEntranceQualificationCommand}
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
     * @param {Post & {data: ChosenUniversityEntranceQualification}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenUniversityEntranceQualification(application, post) {
        if (application.page !== PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const university_entrance_qualification = await this.#data_service.getUniversityEntranceQualification();

        if (!(function nextSelect(select_index) {
            const [
                select_to_data_index,
                select_options
            ] = university_entrance_qualification.selects[select_index];

            const [
                select_type,
                data_index
            ] = university_entrance_qualification["select-to-data"][select_to_data_index];

            if (typeof post.data[select_type] !== "string") {
                return false;
            }
            if (post.data[select_type] === "") {
                return false;
            }

            const data = university_entrance_qualification.data[data_index];

            const _data_index = data.findIndex(option => option.id === post.data[select_type]);

            const select_option = select_options.find(_select_option => (typeof _select_option === "number" ? _select_option : _select_option[0]) === _data_index) ?? null;

            if (select_option === null) {
                return false;
            }
            if (typeof select_option === "number") {
                return true;
            }

            return nextSelect(
                select_option[1]
            );
        })(
            university_entrance_qualification["select-index"]
        )) {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = await this.#data_service.showPreviousStudiesPage(
            application
        ) ? PAGE_PREVIOUS_STUDIES : PAGE_PORTRAIT;

        return true;
    }
}
