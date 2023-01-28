export const isFunction = (value: any): value is Function => {
    if (typeof value === "function") return true;
    return false;
};
