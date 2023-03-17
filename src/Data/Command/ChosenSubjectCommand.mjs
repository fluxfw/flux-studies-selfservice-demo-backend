import { PAGE_CHOICE_SUBJECT, PAGE_INTENDED_DEGREE_PROGRAM } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class ChosenSubjectCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ChosenSubjectCommand}
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
     * @param {Post & {data: ChosenSubject}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenSubject(application, post) {
        if (application.page !== PAGE_CHOICE_SUBJECT || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const choice_subject = await this.#data_service.getChoiceSubject();

        if (typeof post.data["degree-program"] !== "string") {
            return false;
        }
        if (post.data["degree-program"] === "") {
            return false;
        }
        const degree_program = choice_subject["degree-programs"].find(_degree_program => _degree_program.id === post.data["degree-program"]) ?? null;
        if (degree_program === null) {
            return false;
        }

        if (typeof post.data.qualifications !== "object") {
            return false;
        }
        if (Object.keys(post.data.qualifications).length === 0) {
            return false;
        }
        if (!Object.keys(post.data.qualifications).every(qualification => typeof qualification === "string" && qualification !== "")) {
            return false;
        }
        if (!Object.values(post.data.qualifications).every(value => typeof value === "boolean")) {
            return false;
        }
        if (!degree_program.qualifications.every(qualification => qualification.id in post.data.qualifications)) {
            return false;
        }
        if (!degree_program.qualifications.filter(qualification => qualification.required).every(qualification => post.data.qualifications[qualification.id])) {
            return false;
        }
        if (!Object.keys(post.data.qualifications).every(qualification => degree_program.qualifications.some(_qualification => _qualification.id === qualification))) {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_INTENDED_DEGREE_PROGRAM;

        return true;
    }
}
