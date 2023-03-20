import CHOICE_SUBJECT from "../ChoiceSubject/choice-subject.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../DataService.mjs").DataService} DataService */

export class GetChoiceSubjectCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetChoiceSubjectCommand}
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
     * @param {ChosenSubject | null} values
     * @returns {Promise<ChoiceSubject>}
     */
    async getChoiceSubject(values = null) {
        return structuredClone({
            ...CHOICE_SUBJECT,
            "degree-programs": await this.#data_service.getDegreePrograms(),
            values
        });
    }
}
