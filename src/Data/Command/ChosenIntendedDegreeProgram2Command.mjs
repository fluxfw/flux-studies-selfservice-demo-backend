import { PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Application/Application.mjs").Application} Application */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram2/ChosenIntendedDegreeProgram2.mjs").ChosenIntendedDegreeProgram2} ChosenIntendedDegreeProgram2 */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Label/Label.mjs").Label} Label */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class ChosenIntendedDegreeProgram2Command {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {ChosenIntendedDegreeProgram2Command}
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
     * @param {Post & {data: ChosenIntendedDegreeProgram2}} post
     * @returns {Promise<boolean | Label[]>}
     */
    async chosenIntendedDegreeProgram2(application, post) {
        if (application.page !== PAGE_INTENDED_DEGREE_PROGRAM_2 || post.page !== application.page) {
            return false;
        }

        if (typeof post.data !== "object") {
            return false;
        }

        const intended_degree_program_2 = await this.#data_service.getIntendedDegreeProgram2(
            (await this.#data_service.getPost(
                application,
                PAGE_INTENDED_DEGREE_PROGRAM
            )).data
        );

        if (intended_degree_program_2.combination["single-choice"] === null && post.data["single-choice"] !== null) {
            return false;
        }
        if (intended_degree_program_2.combination["single-choice"] !== null && (typeof post.data["single-choice"] !== "object"
            || Object.keys(post.data["single-choice"]).length === 0
            || !Object.keys(post.data["single-choice"]).every(key => typeof key === "string" && key !== "")
            || !Object.values(post.data["single-choice"]).every(value => typeof value === "string" && value !== "")
            || !intended_degree_program_2.combination["single-choice"].every(single_choice => single_choice.id in post.data["single-choice"])
            || !Object.entries(post.data["single-choice"]).every(([
                key,
                value
            ]) => {
                const single_choice = intended_degree_program_2.combination["single-choice"].find(_single_choice => _single_choice.id === key) ?? null;

                if (single_choice === null) {
                    return false;
                }

                return single_choice.choices.some(choice => choice.id === value);
            }))) {
            return false;
        }

        if (intended_degree_program_2.combination["multiple-choice"] === null && post.data["multiple-choice"] !== null) {
            return false;
        }
        if (intended_degree_program_2.combination["multiple-choice"] !== null && (typeof post.data["multiple-choice"] !== "object"
            || Object.keys(post.data["multiple-choice"]).length === 0
            || !Object.keys(post.data["multiple-choice"]).every(key => typeof key === "string" && key !== "")
            || !Object.values(post.data["multiple-choice"]).every(value => Array.isArray(value) && value.length > 0 && value.every(_value => typeof _value === "string" && _value !== ""))
            || !intended_degree_program_2.combination["multiple-choice"].every(multiple_choice => multiple_choice.id in post.data["multiple-choice"])
            || !Object.entries(post.data["multiple-choice"]).every(([
                key,
                value
            ]) => {
                const multiple_choice = intended_degree_program_2.combination["multiple-choice"].find(_multiple_choice => _multiple_choice.id === key) ?? null;

                if (multiple_choice === null) {
                    return false;
                }

                if (!value.every(_value => multiple_choice.choices.some(choice => choice.id === _value))) {
                    return false;
                }

                let ect = 0;
                for (const choice of multiple_choice.choices) {
                    if (value.includes(choice.id)) {
                        ect += choice.ect;
                    }
                }

                return ect === multiple_choice.ect;
            }))) {
            return false;
        }

        if (typeof post.data["further-information"] !== "string") {
            return false;
        }

        await this.#data_service.addPost(
            application,
            post
        );

        application.page = PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION;

        return true;
    }
}
