import INTENDED_DEGREE_PROGRAM from "../../../Adapter/Data/IntendedDegreeProgram/intended-degree-program.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/IntendedDegreeProgram/ChosenIntendedDegreeProgram.mjs").ChosenIntendedDegreeProgram} ChosenIntendedDegreeProgram */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/IntendedDegreeProgram/IntendedDegreeProgram.mjs").IntendedDegreeProgram} IntendedDegreeProgram */

export class GetIntendedDegreeProgramCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetIntendedDegreeProgramCommand}
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
     * @param {ChosenIntendedDegreeProgram | null} values
     * @returns {Promise<IntendedDegreeProgram>}
     */
    async getIntendedDegreeProgram(values = null) {
        return structuredClone({
            ...INTENDED_DEGREE_PROGRAM,
            subjects: await this.#data_service.getSubjects(),
            values
        });
    }
}
