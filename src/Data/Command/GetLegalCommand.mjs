import LEGAL from "../Legal/legal.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Legal/AcceptedLegal.mjs").AcceptedLegal} AcceptedLegal */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/IntendedDegreeProgram2/ChosenIntendedDegreeProgram2.mjs").ChosenIntendedDegreeProgram2} ChosenIntendedDegreeProgram2 */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/ChoiceSubject/ChosenSubject.mjs").ChosenSubject} ChosenSubject */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Legal/Legal.mjs").Legal} Legal */

export class GetLegalCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetLegalCommand}
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
     * @param {ChosenSubject} chosen_subject
     * @param {ChosenIntendedDegreeProgram} chosen_intended_degree_program
     * @param {ChosenIntendedDegreeProgram2} chosen_intended_degree_program_2
     * @param {AcceptedLegal | null} values
     * @returns {Promise<Legal>}
     */
    async getLegal(chosen_subject, chosen_intended_degree_program, chosen_intended_degree_program_2, values = null) {
        const subject = (await this.#data_service.getSubjects()).find(_subject => _subject.id === chosen_intended_degree_program.subject);

        const _subject = structuredClone(subject);
        delete _subject.combinations;

        return structuredClone({
            ...LEGAL,
            "degree-program": (await this.#data_service.getDegreePrograms()).find(degree_program => degree_program.id === chosen_subject["degree-program"]),
            subject: _subject,
            combination: subject.combinations.find(combination => combination.id === chosen_intended_degree_program.combination),
            "single-choice": chosen_intended_degree_program_2["single-choice"],
            "multiple-choice": chosen_intended_degree_program_2["multiple-choice"],
            values
        });
    }
}
