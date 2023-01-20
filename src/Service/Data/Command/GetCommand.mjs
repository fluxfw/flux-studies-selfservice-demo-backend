import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_START, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../../flux-studis-selfservice-frontend/src/Adapter/Page/PAGE.mjs";

/** @typedef {import("../../../Adapter/Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../Port/DataService.mjs").DataService} DataService */

export class GetCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {GetCommand}
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
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async get(session_number = null) {
        const application = session_number !== null ? await this.#data_service.getApplicationBySessionNumber(
            session_number
        ) : null;

        let page = application?.page ?? null;
        let data = {};
        const identification_number = application?.["identification-number"] ?? null;
        let can_back = true;
        let can_logout = true;
        let response_session_number = null;

        switch (page) {
            case PAGE_CHOICE_SUBJECT:
                data = await this.#data_service.getChoiceSubject(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_CHOICE_SUBJECT
                    ))?.data ?? null
                );
                can_back = false;
                break;

            case PAGE_COMPLETED:
                break;

            case PAGE_IDENTIFICATION_NUMBER:
                data = await this.#data_service.getIdentificationNumber(
                    identification_number
                );
                can_back = false;
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM:
                data = await this.#data_service.getIntendedDegreeProgram(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    ))?.data ?? null
                );
                break;

            case PAGE_INTENDED_DEGREE_PROGRAM_2:
                data = await this.#data_service.getIntendedDegreeProgram2(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    )).data,
                    (await this.#data_service.getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM_2
                    ))?.data ?? null
                );
                break;

            case PAGE_LEGAL:
                data = await this.#data_service.getLegal(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_CHOICE_SUBJECT
                    )).data,
                    (await this.#data_service.getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM
                    )).data,
                    (await this.#data_service.getPost(
                        application,
                        PAGE_INTENDED_DEGREE_PROGRAM_2
                    )).data,
                    (await this.#data_service.getPost(
                        application,
                        PAGE_LEGAL
                    ))?.data ?? null
                );
                break;

            case PAGE_PERSONAL_DATA:
                data = await this.#data_service.getPersonalData(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_PERSONAL_DATA
                    ))?.data ?? null
                );
                break;

            case PAGE_PORTRAIT:
                data = await this.#data_service.getPortrait(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_PORTRAIT
                    ))?.data ?? null
                );
                break;

            case PAGE_PREVIOUS_STUDIES:
                data = await this.#data_service.getPreviousStudies(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_PREVIOUS_STUDIES
                    ))?.data ?? null
                );
                break;

            case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION:
                data = await this.#data_service.getUniversityEntranceQualification(
                    (await this.#data_service.getPost(
                        application,
                        PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION
                    ))?.data ?? null
                );
                break;

            default:
                page = PAGE_START;
                data = await this.#data_service.getStart();
                can_back = false;
                can_logout = false;
                if (session_number !== null) {
                    response_session_number = false;

                    await this.#data_service.removeSession(
                        session_number
                    );
                }
                break;
        }

        return {
            data: {
                page,
                data,
                "identification-number": identification_number,
                "can-back": can_back,
                "can-logout": can_logout
            },
            "session-number": response_session_number
        };
    }
}
