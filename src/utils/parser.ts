export const stringToSimpleJson = (value: string) => {
    try {
        return JSON.parse(value);
    } catch (err) {
        return null;
    }
}