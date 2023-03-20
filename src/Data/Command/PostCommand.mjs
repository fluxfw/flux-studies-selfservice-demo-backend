import { MENU_ID_APPLICATION_LOGIN } from "../../../../flux-studis-selfservice-frontend/src/Menu/MENU_ID.mjs";
import { PAGE_CHOICE_SUBJECT, PAGE_CREATE, PAGE_IDENTIFICATION_NUMBER, PAGE_INTENDED_DEGREE_PROGRAM, PAGE_INTENDED_DEGREE_PROGRAM_2, PAGE_LEGAL, PAGE_PERSONAL_DATA, PAGE_PORTRAIT, PAGE_PREVIOUS_STUDIES, PAGE_RESUME, PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION } from "../../../../flux-studis-selfservice-frontend/src/Page/PAGE.mjs";

/** @typedef {import("../../Response/ApiResponse.mjs").ApiResponse} ApiResponse */
/** @typedef {import("../DataService.mjs").DataService} DataService */
/** @typedef {import("../../../../flux-studis-selfservice-frontend/src/Post/Post.mjs").Post} Post */

export class PostCommand {
    /**
     * @type {DataService}
     */
    #data_service;

    /**
     * @param {DataService} data_service
     * @returns {PostCommand}
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
     * @param {Post} post
     * @param {string | null} session_number
     * @returns {Promise<ApiResponse>}
     */
    async post(post, session_number = null) {
        const application = session_number !== null ? await this.#data_service.getApplicationBySessionNumber(
            session_number
        ) : null;

        const menu = await this.#data_service.getMenu(
            application
        );

        let ok = false;
        let response_session_number = null;
        let error_messages = null;

        if (typeof post === "object") {
            if (application !== null) {
                switch (menu.id) {
                    case MENU_ID_APPLICATION_LOGIN:
                        switch (application.page) {
                            case PAGE_CHOICE_SUBJECT: {
                                const result = await this.#data_service.chosenSubject(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_IDENTIFICATION_NUMBER: {
                                const result = await this.#data_service.confirmedIdentificationNumber(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_INTENDED_DEGREE_PROGRAM: {
                                const result = await this.#data_service.chosenIntendedDegreeProgram(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_INTENDED_DEGREE_PROGRAM_2: {
                                const result = await this.#data_service.chosenIntendedDegreeProgram2(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_LEGAL: {
                                const result = await this.#data_service.acceptedLegal(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_PERSONAL_DATA: {
                                const result = await this.#data_service.filledPersonalData(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_PORTRAIT: {
                                const result = await this.#data_service.chosenPortrait(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_PREVIOUS_STUDIES: {
                                const result = await this.#data_service.chosenPreviousStudies(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            case PAGE_UNIVERSITY_ENTRANCE_QUALIFICATION: {
                                const result = await this.#data_service.chosenUniversityEntranceQualification(
                                    application,
                                    post
                                );

                                if (typeof result === "boolean") {
                                    ok = result;
                                } else {
                                    error_messages = result;
                                }
                            }
                                break;

                            default:
                                break;
                        }
                        break;

                    default:
                        break;
                }
            } else {
                switch (menu.id) {
                    case MENU_ID_APPLICATION_LOGIN:
                        switch (post.page) {
                            case PAGE_CREATE: {
                                const result = await this.#data_service.create(
                                    post
                                );

                                if (typeof result === "string") {
                                    ok = true;
                                    response_session_number = result;
                                } else {
                                    if (result !== false) {
                                        error_messages = result;
                                    }
                                }
                            }
                                break;

                            case PAGE_RESUME: {
                                const result = await this.#data_service.resume(
                                    post
                                );

                                if (typeof result === "string") {
                                    ok = true;
                                    response_session_number = result;
                                } else {
                                    if (result !== false) {
                                        error_messages = result;
                                    }
                                }
                            }
                                break;

                            default:
                                break;
                        }
                        break;

                    default:
                        break;
                }
            }
        }

        return {
            data: {
                ok,
                "error-messages": error_messages
            },
            "session-number": response_session_number
        };
    }
}
