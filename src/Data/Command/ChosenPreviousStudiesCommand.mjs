import { PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PreviousStudies/ChosenPreviousStudies.mjs").ChosenPreviousStudies} ChosenPreviousStudies */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class ChosenPreviousStudiesCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ChosenPreviousStudiesCommand}
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
     * @param {Post & {data: ChosenPreviousStudies}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenPreviousStudies(application, post) {
        if (application.page !== PAGE_PREVIOUS_STUDIES || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const previous_studies = await this.#data_service.getPreviousStudies();

        if (!Array.isArray(post.data["previous-studies"])) {
            return false;
        }
        if (post.data["previous-studies"].length === 0) {
            return false;
        }
        if (!post.data["previous-studies"].every(previous_study => {
            if (typeof previous_study !== "object") {
                return false;
            }

            if (typeof previous_study["certificate-type"] !== "string") {
                return false;
            }
            if (previous_study["certificate-type"] === "") {
                return false;
            }
            if (!previous_studies["certificate-types"].some(certificate_type => certificate_type.id === previous_study["certificate-type"])) {
                return false;
            }

            if (!Number.isInteger(previous_study["start-date"])) {
                return false;
            }
            if (previous_study["start-date"] < previous_studies["min-start-date"]) {
                return false;
            }
            if (previous_study["start-date"] > previous_studies["max-start-date"]) {
                return false;
            }

            if (!Number.isInteger(previous_study["end-date"])) {
                return false;
            }
            if (previous_study["end-date"] < previous_studies["min-end-date"]) {
                return false;
            }
            if (previous_study["end-date"] > previous_studies["max-end-date"]) {
                return false;
            }

            if (previous_study["end-date"] < previous_study["start-date"]) {
                return false;
            }

            if (typeof previous_study.university !== "string") {
                return false;
            }
            if (previous_study.university === "") {
                return false;
            }
            if (!previous_studies.schools.some(school => school.id === previous_study.university)) {
                return false;
            }

            if (typeof previous_study.subject !== "string") {
                return false;
            }
            if (previous_study.subject === "") {
                return false;
            }

            if (!Number.isInteger(previous_study.semesters)) {
                return false;
            }
            if (previous_study.semesters < previous_studies["min-semesters"]) {
                return false;
            }
            if (previous_study.semesters > previous_studies["max-semesters"]) {
                return false;
            }

            if (typeof previous_study["degree-title"] !== "string") {
                return false;
            }
            if (previous_study["degree-title"] === "") {
                return false;
            }
            if (!previous_studies["degree-titles"].some(degree_title => degree_title.id === previous_study["degree-title"])) {
                return false;
            }

            if (typeof previous_study["certificate-country"] !== "string") {
                return false;
            }
            if (previous_study["certificate-country"] === "") {
                return false;
            }
            if (!previous_studies.countries.some(country => country.id === previous_study["certificate-country"])) {
                return false;
            }

            if (typeof previous_study["certificate-canton"] !== "string") {
                return false;
            }
            if (previous_study["certificate-canton"] === "") {
                return false;
            }
            if (!previous_studies.cantons.some(canton => canton.id === previous_study["certificate-canton"])) {
                return false;
            }

            if (typeof previous_study["certificate-place"] !== "string") {
                return false;
            }
            if (previous_study["certificate-place"] === "") {
                return false;
            }
            if (!previous_studies.places.some(place => place.id === previous_study["certificate-place"])) {
                return false;
            }

            return true;
        })) {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_PORTRAIT;

        return true;
    }
}
