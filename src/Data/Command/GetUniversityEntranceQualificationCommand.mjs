import UNIVERSITY_ENTRANCE_QUALIFICATION from "../UniversityEntranceQualification/university-entrance-qualification.json" assert {type: "json"};
import { UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_CANTON, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_COUNTRY, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_PLACE, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_TYPE, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_ISSUE_YEAR, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_MATURA_CANTON, UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_UPPER_SECONDARY_SCHOOL } from "../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE.mjs";

/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/ChosenUniversityEntranceQualification.mjs").ChosenUniversityEntranceQualification} ChosenUniversityEntranceQualification */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/UniversityEntranceQualification.mjs").UniversityEntranceQualification} UniversityEntranceQualification */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/UniversityEntranceQualification/UniversityEntranceQualificationSelectOption.mjs").UniversityEntranceQualificationSelectOption} UniversityEntranceQualificationSelectOption */

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
        const cantons = await this.#data_service.getCantons();
        const certificates = await this.#data_service.getCertificates();
        const certificate_types = await this.#data_service.getCertificateTypes();
        const countries = await this.#data_service.getCountries();
        const issue_years = await this.#data_service.getIssueYears();
        const places = await this.#data_service.getPlaces();
        const schools = await this.#data_service.getSchools();

        const data = [
            cantons,
            certificates,
            certificate_types,
            countries,
            issue_years,
            places,
            schools
        ];

        const select_to_data = Object.entries({
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE]: certificates,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_CANTON]: cantons,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_COUNTRY]: countries,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_PLACE]: places,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_TYPE]: certificate_types,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_ISSUE_YEAR]: issue_years,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_MATURA_CANTON]: cantons,
            [UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_UPPER_SECONDARY_SCHOOL]: schools
        }).map(([
            type,
            _data
        ]) => [
                type,
                data.indexOf(_data)
            ]);

        const selects = [];

        /**
         * @param {string} select_type
         * @param {UniversityEntranceQualificationSelectOption[]} select_options
         * @returns {number}
         */
        const addSelect = (select_type, select_options) => {
            const select = [
                select_to_data.findIndex(([
                    _select_type
                ]) => _select_type === select_type),
                select_options
            ];

            const select_index = selects.findIndex(_select => `${_select}` === `${select}`);

            if (select_index !== -1) {
                return select_index;
            }

            return selects.push(select) - 1;
        }

        return structuredClone({
            ...UNIVERSITY_ENTRANCE_QUALIFICATION,
            data: data.map(data_2 => Object.fromEntries(data_2.map(data_3 => [
                data_3.id,
                data_3
            ]))),
            "select-to-data": select_to_data,
            selects,
            "select-index": addSelect(
                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_TYPE,
                certificate_types.map(certificate_type => [
                    certificate_type.id,
                    addSelect(
                        UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_ISSUE_YEAR,
                        issue_years.map(issue_year => [
                            issue_year.id,
                            addSelect(
                                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE,
                                certificates.map(certificate => [
                                    certificate.id,
                                    addSelect(
                                        UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_MATURA_CANTON,
                                        cantons.map(canton => [
                                            canton.id,
                                            addSelect(
                                                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_UPPER_SECONDARY_SCHOOL,
                                                schools.map(school => [
                                                    school.id,
                                                    addSelect(
                                                        UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_COUNTRY,
                                                        countries.map(country => [
                                                            country.id,
                                                            addSelect(
                                                                UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_CANTON,
                                                                cantons.map(canton_2 => [
                                                                    canton_2.id,
                                                                    addSelect(
                                                                        UNIVERSITY_ENTRANCE_QUALIFICATION_SELECT_TYPE_CERTIFICATE_PLACE,
                                                                        places.map(place => place.id)
                                                                    )
                                                                ])
                                                            )
                                                        ])
                                                    )
                                                ])
                                            )
                                        ])
                                    )
                                ])
                            )
                        ])
                    )
                ])
            ),
            values
        });
    }
}
