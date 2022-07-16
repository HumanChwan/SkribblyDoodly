export const shuffle = (array: Array<any>): Array<any> => {
    const length = array.length;
    const copy = [...array];
    for (let idx = 0; idx < length; ++idx) {
        const randomIdx = Math.floor(Math.random() * (length - idx)) + idx;
        [copy[idx], copy[randomIdx]] = [copy[randomIdx], copy[idx]];
    }
    return copy;
};
