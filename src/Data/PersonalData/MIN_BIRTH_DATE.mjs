import { MAX_BIRTH_DATE } from "./MAX_BIRTH_DATE.mjs";

const date = new Date(MAX_BIRTH_DATE);

date.setFullYear(date.getFullYear() - 50);

export const [
    MIN_BIRTH_DATE
] = date.toISOString().split("T");
