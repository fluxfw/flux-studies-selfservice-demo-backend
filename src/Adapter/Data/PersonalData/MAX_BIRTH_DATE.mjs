const date = new Date();

date.setFullYear(date.getFullYear() - 15);

export const [
    MAX_BIRTH_DATE
] = date.toISOString().split("T");
