import { MAX_ISSUE_DATE } from "../../../Adapter/Data/UniversityEntranceQualification/MAX_ISSUE_DATE.mjs";
import { MIN_ISSUE_DATE } from "../../../Adapter/Data/UniversityEntranceQualification/MIN_ISSUE_DATE.mjs";
import UNIVERSITY_ENTRANCE_QUALIFICATION from "../../../Adapter/Data/UniversityEntranceQualification/university-entrance-qualification.json" assert {type: "json"};

/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../../flux-studis-selfservice-frontend/src/Adapter/UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */

export class GetUniversityEntranceQualificationCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetUniversityEntranceQualificationCommand}
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
     * @param {ChosenUniversityEntranceQualification | null} values
     * @returns {Promise<UniversityEntranceQualification>}
     */
    async getUniversityEntranceQualification(values = null) {
        const certificates = await this.#data_service.getCertificates();
        const cantons = await this.#data_service.getCantons();
        const schools = await this.#data_service.getSchools();
        const countries = await this.#data_service.getCountries();
        const places = await this.#data_service.getPlaces();

        return {
            ...UNIVERSITY_ENTRANCE_QUALIFICATION,
            "certificate-types": (await this.#data_service.getCertificateTypes()).map(certificate_type => ({
                ...certificate_type,
                "min-issue-date": MIN_ISSUE_DATE,
                "max-issue-date": MAX_ISSUE_DATE,
                certificates: certificates.map(certificate => ({
                    ...certificate,
                    id: `${certificate_type.id}_${certificate.id}`,
                    cantons: cantons.map(canton => ({
                        ...canton,
                        id: `${certificate_type.id}_${certificate.id}_${canton.id}`,
                        schools: schools.map(school => ({
                            ...school,
                            id: `${certificate_type.id}_${certificate.id}_${canton.id}_${school.id}`,
                            countries: countries.map(country => ({
                                ...country,
                                id: `${certificate_type.id}_${certificate.id}_${canton.id}_${school.id}_${country.id}`,
                                cantons: cantons.map(canton_2 => ({
                                    ...canton_2,
                                    id: `${certificate_type.id}_${certificate.id}_${canton.id}_${school.id}_${country.id}_${canton_2.id}`,
                                    places: places.map(place => ({
                                        ...place,
                                        id: `${certificate_type.id}_${certificate.id}_${canton.id}_${school.id}_${country.id}_${canton_2.id}_${place.id}`
                                    }))
                                }))
                            }))
                        }))
                    }))
                }))
            })),
            values
        };
    }
}
