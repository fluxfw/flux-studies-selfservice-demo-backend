import { MAX_BIRTH_DATE } from "../../../Adapter/Data/PersonalData/MAX_BIRTH_DATE.mjs";
import { MIN_BIRTH_DATE } from "../../../Adapter/Data/PersonalData/MIN_BIRTH_DATE.mjs";
import { OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT } from "../../../Adapter/Data/PersonalData/OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT.mjs";
import PERSONAL_DATA from "../../../Adapter/Data/PersonalData/personal-data.json" assert {type: "json"};
import { REGISTRATION_NUMBER_FORMAT } from "../../../Adapter/Data/PersonalData/REGISTRATION_NUMBER_FORMAT.mjs";

/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/PersonalData/PersonalData.mjs").PersonalData} PersonalData */

export class GetPersonalDataCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetPersonalDataCommand}
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
     * @param {FilledPersonalData | null} values
     * @returns {Promise<PersonalData>}
     */
    async getPersonalData(values = null) {
        return structuredClone({
            ...PERSONAL_DATA,
            salutations: await this.#data_service.getSalutations(),
            "registration-number-format": `${REGISTRATION_NUMBER_FORMAT}`,
            countries: await this.#data_service.getCountries(),
            places: await this.#data_service.getPlacesWithPostalCode(),
            "area-codes": await this.#data_service.getAreaCodes(),
            languages: await this.#data_service.getLanguages(),
            "min-birth-date": MIN_BIRTH_DATE,
            "max-birth-date": MAX_BIRTH_DATE,
            "old-age-survivar-insurance-number-format": `${OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT}`,
            values
        });
    }
}
