import { Tank } from './tank';
import { Watcher } from './watcher';
export class Observer {
    constructor(data: any) {
        this.defineReactive(data);
    }

    defineReactive(observerObj: any) {
        const dep = new Dep(); // 创建监听列表
        const observerArr = Object.keys(observerObj);
        if (observerArr.length === 0)  return;
        Object.keys(observerObj).forEach((key) => {
            let val = observerObj[key];
            let childObj = observe(val);
            Object.defineProperty(observerObj, key, {
                enumerable: true,
                configurable: false,
                get: function () {
                    if (Dep.target) {
                        dep.depend();
                    }
                    return val;
                },
                set: function (newVal) {
                    if (newVal === val) {
                        return;
                    }
                    val = newVal;
                    childObj = observe(val);
                    dep.notify();
                }
            });
        });
    }
    _typeof(data: any) {
        return Object.prototype.toString.call(data);
    }
}

function observe(value: any) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}
export class Dep {
    public static id = 0;
    public static target: any;
    subs: Watcher[] = [];
    constructor() {
        Dep.id = Dep.id++;
    }
    addSub(sub: Watcher) {
        this.subs.push(sub);
    }
    depend() {
        Dep.target.addDep(this);
    }
    removeSub(sub: Watcher) {
        const index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    }
    notify() {
        if (this.subs.length > 0) {
            this.subs.forEach((sub) => {
                sub.updateValue();
            })
        }
    }
}
