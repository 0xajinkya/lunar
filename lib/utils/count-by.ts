export const countBy = <T extends Record<string, any>>(
    array: readonly T[],
    key: keyof T
): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const item of array) {
        const val = String(item[key]);
        result[val] = (result[val] || 0) + 1;
    }
    return result;
}
