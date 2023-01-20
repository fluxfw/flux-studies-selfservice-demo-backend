import CHOICE_SUBJECT from "../../../Adapter/Data/ChoiceSubject/choice-subject.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/ChoiceSubject/ChoiceSubject.mjs").ChoiceSubject} ChoiceSubject */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */

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
        return {
            ...CHOICE_SUBJECT,
            "degree-programs": await this.#data_service.getDegreePrograms(),
            values
        };
    }
}
