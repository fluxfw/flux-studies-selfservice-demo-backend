import DEGREE_PROGRAMS from "../DegreeProgram/degree-programs.json" assert {type: "json"};

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/DegreeProgram/DegreeProgram.mjs").DegreeProgram} DegreeProgram */

export class GetDegreeProgramsCommand {
    /**
     * @returns {GetDegreeProgramsCommand}
     */
    static new() {
        return new this();
    }

    /**
     * @private
     */
    constructor() {

    }

    /**
     * @returns {Promise<DegreeProgram[]>}
     */
    async getDegreePrograms() {
        return structuredClone(DEGREE_PROGRAMS);
    }
}
