import { MENU_ID_APPLICATION_LOGIN } from "../../../../flux-studis-selfservice-frontend/src/Menu/MENU_ID.mjs";
import { PAGE_CHOICE_SUBJECT, PAGE_COMPLETED, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../DataService.mjs").DataService} DataService */

export class BackCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {BackCommand}
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
    async back(session_number = null) {
        const application = session_number !== null ? await this.#data_service.getApplicationBySessionNumber(
            session_number
        ) : null;

        let response_session_number = null;

        switch ((await this.#data_service.getMenu(
            application
        )).id) {
            case MENU_ID_APPLICATION_LOGIN:
                switch (application?.page ?? null) {
                    case PAGE_COMPLETED:
                        application.page = PAGE_LEGAL;
                        break;

                    case PAGE_INTENDED_DEGREE_PROGRAM:
                        application.page = PAGE_CHOICE_SUBJECT;
                        break;

                    case PAGE_INTENDED_DEGREE_PROGRAM_2:
                        application.page = PAGE_INTENDED_DEGREE_PROGRAM;
                        break;

                    case PAGE_LEGAL:
                        application.page = PAGE_PERSONAL_DATA;
                        break;

                    case PAGE_PERSONAL_DATA:
                        application.page = PAGE_PORTRAIT;
                        break;

                    case PAGE_PORTRAIT:
                        application.page = await this.#data_service.showPreviousStudiesPage(
                            application
                        ) ? PAGE_PREVIOUS_STUDIES : PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION;
                        break;

                    case PAGE_PREVIOUS_STUDIES:
                        application.page = PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION;
                        break;

                    case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION:
                        application.page = PAGE_INTENDED_DEGREE_PROGRAM_2;
                        break;

                    default:
                        if (session_number !== null) {
                            response_session_number = false;

                            await this.#data_service.removeSession(
                                session_number
                            );
                        }
                        break;
                }
                break;

            default:
                break;
        }

        return {
            data: null,
            "session-number": response_session_number
        };
    }
}
