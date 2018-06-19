export function deepCopy(obj: any): any {
    const target = obj.constructor === Array ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                target[key] = deepCopy(obj[key]);
            } else {
                target[key] = obj[key];
            }
        } 
    }
    return target;
}