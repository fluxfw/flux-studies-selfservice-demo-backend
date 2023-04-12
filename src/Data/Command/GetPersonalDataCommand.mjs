import { MAX_BIRTH_DATE } from "../PersonalData/MAX_BIRTH_DATE.mjs";
import { MIN_BIRTH_DATE } from "../PersonalData/MIN_BIRTH_DATE.mjs";
import { OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT } from "../PersonalData/OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT.mjs";
import PERSONAL_DATA from "../PersonalData/personal-data.json" assert {type: "json"};
import { REGISTRATION_NUMBER_FORMAT } from "../PersonalData/REGISTRATION_NUMBER_FORMAT.mjs";

/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PersonalData/FilledPersonalData.mjs").FilledPersonalData} FilledPersonalData */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/PersonalData/PersonalData.mjs").PersonalData} PersonalData */

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
            "mother-languages": await this.#data_service.getMotherLanguages(),
            "correspondence-languages": await this.#data_service.getCorrespondenceLanguages(),
            "min-birth-date": MIN_BIRTH_DATE,
            "max-birth-date": MAX_BIRTH_DATE,
            "old-age-survivar-insurance-number-format": `${OLD_AGE_SURVIVAR_INSURANCE_NUMBER_FORMAT}`,
            nationalities: await this.#data_service.getNationalities(),
            "origin-places": await this.#data_service.getOriginPlaces(),
            values
        });
    }
}
