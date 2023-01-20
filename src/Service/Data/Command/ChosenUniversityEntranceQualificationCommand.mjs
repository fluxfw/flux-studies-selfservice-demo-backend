import { PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../../../Adapter/Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/Post/Post.mjs").Post} Post */

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

        if (typeof post.data["certificate-type"] !== "string") {
            return false;
        }
        if (post.data["certificate-type"] === "") {
            return false;
        }
        const certificate_type = university_entrance_qualification["certificate-types"].find(_certificate_type => _certificate_type.id === post.data["certificate-type"]) ?? null;
        if (certificate_type === null) {
            return false;
        }

        if (typeof post.data["issue-date"] !== "number") {
            return false;
        }
        if (!Number.isInteger(post.data["issue-date"])) {
            return false;
        }
        if (post.data["issue-date"] < certificate_type["min-issue-date"]) {
            return false;
        }
        if (post.data["issue-date"] > certificate_type["max-issue-date"]) {
            return false;
        }

        if (typeof post.data.certificate !== "string") {
            return false;
        }
        if (post.data.certificate === "") {
            return false;
        }
        const certificate = certificate_type.certificates.find(_certificate => _certificate.id === post.data.certificate) ?? null;
        if (certificate === null) {
            return false;
        }

        if (typeof post.data["matura-canton"] !== "string") {
            return false;
        }
        if (post.data["matura-canton"] === "") {
            return false;
        }
        const matura_canton = certificate.cantons.find(canton => canton.id === post.data["matura-canton"]) ?? null;
        if (matura_canton === null) {
            return false;
        }

        if (typeof post.data["upper-secondary-school"] !== "string") {
            return false;
        }
        if (post.data["upper-secondary-school"] === "") {
            return false;
        }
        const upper_secondary_school = matura_canton.schools.find(school => school.id === post.data["upper-secondary-school"]) ?? null;
        if (upper_secondary_school === null) {
            return false;
        }

        if (typeof post.data["certificate-country"] !== "string") {
            return false;
        }
        if (post.data["certificate-country"] === "") {
            return false;
        }
        const certificate_country = upper_secondary_school.countries.find(country => country.id === post.data["certificate-country"]) ?? null;
        if (certificate_country === null) {
            return false;
        }

        if (typeof post.data["certificate-canton"] !== "string") {
            return false;
        }
        if (post.data["certificate-canton"] === "") {
            return false;
        }
        const certificate_canton = certificate_country.cantons.find(canton => canton.id === post.data["certificate-canton"]) ?? null;
        if (certificate_canton === null) {
            return false;
        }

        if (typeof post.data["certificate-place"] !== "string") {
            return false;
        }
        if (post.data["certificate-place"] === "") {
            return false;
        }
        if (!certificate_canton.places.some(place => place.id === post.data["certificate-place"])) {
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
