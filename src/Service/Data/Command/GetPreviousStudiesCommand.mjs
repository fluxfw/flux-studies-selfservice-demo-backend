import { MAX_END_DATE } from "../../../Adapter/Data/PreviousStudies/MAX_END_DATE.mjs";
import { MAX_START_DATE } from "../../../Adapter/Data/PreviousStudies/MAX_START_DATE.mjs";
import { MIN_END_DATE } from "../../../Adapter/Data/PreviousStudies/MIN_END_DATE.mjs";
import { MIN_START_DATE } from "../../../Adapter/Data/PreviousStudies/MIN_START_DATE.mjs";
import PREVIOUS_STUDIES from "../../../Adapter/Data/PreviousStudies/previous-studies.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/PreviousStudies/ChosenPreviousStudies.mjs").ChosenPreviousStudies} ChosenPreviousStudies */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/PreviousStudies/PreviousStudies.mjs").PreviousStudies} PreviousStudies */

export class GetPreviousStudiesCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetPreviousStudiesCommand}
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
     * @param {ChosenPreviousStudies | null} values
     * @returns {Promise<PreviousStudies>}
     */
    async getPreviousStudies(values = null) {
        return {
            ...PREVIOUS_STUDIES,
            "certificate-types": await this.#data_service.getCertificateTypes(),
            "min-start-date": MIN_START_DATE,
            "max-start-date": MAX_START_DATE,
            "min-end-date": MIN_END_DATE,
            "max-end-date": MAX_END_DATE,
            schools: await this.#data_service.getSchools(),
            "degree-titles": await this.#data_service.getDegreeTitles(),
            countries: await this.#data_service.getCountries(),
            cantons: await this.#data_service.getCantons(),
            places: await this.#data_service.getPlaces(),
            values
        };
    }
}
