import { PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2 } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class ChosenIntendedDegreeProgramCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ChosenIntendedDegreeProgramCommand}
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
     * @param {Post & {data: ChosenIntendedDegreeProgram}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenIntendedDegreeProgram(application, post) {
        if (application.page !== PAGE_INTENDED_DEGREE_PROGRAM || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const intended_degree_program = await this.#data_service.getIntendedDegreeProgram();

        if (typeof post.data.subject !== "string") {
            return false;
        }
        if (post.data.subject === "") {
            return false;
        }
        const subject = intended_degree_program.subjects.find(_subject => _subject.id === post.data.subject) ?? null;
        if (subject === null) {
            return false;
        }

        if (typeof post.data.combination !== "string") {
            return false;
        }
        if (post.data.combination === "") {
            return false;
        }
        if (!subject.combinations.some(combination => combination.id === post.data.combination)) {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_INTENDED_DEGREE_PROGRAM_2;

        return true;
    }
}
