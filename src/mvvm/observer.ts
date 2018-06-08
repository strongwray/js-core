import { Subscribe } from './subscribe';
import { Watcher } from './watcher';
export class Observer {
    constructor(data: any) {
        this.defineReactive(data);
    }
    defineReactive(observerObj: any) {
        const observerArr = Object.keys(observerObj);
        if (observerArr.length === 0)  return;
        Object.keys(observerObj).forEach((key) => {
            let val = observerObj[key];
            if (this._typeof(val) === '[object Object]') {
                this.defineReactive(val);
            }
            Object.defineProperty(observerObj, key, {
                enumerable: true,
                configurable: false,
                get: function () {
                    return val;
                },
                set: function (newVal) {
                    if (newVal === val) {
                        return;
                    }
                    console.log(newVal);
                    val = newVal;
                }
            });
        });
    }
    _typeof(data: any) {
        return Object.prototype.toString.call(data);
    }
}