import { Tank } from './tank';
import { Dep } from './observer'; 
export class Watcher {
    vm: Tank;
    cb: Function;
    expOrFn: any;
    depIds = {};
    oldValue: any;
    constructor(vm: Tank, expOrFn: any, cb: Function) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.oldValue = this.get();
    }
    addDep(dep: Dep) {
        if (!this.depIds.hasOwnProperty(Dep.id)) {
            dep.addSub(this);
            this.depIds[Dep.id] = dep;
        }
     }
    get() {
        Dep.target = this;
        var value = this._getVMVal(this.vm, this.expOrFn);
        Dep.target = null;
        return value;
    }
    updateValue() {
       const value = this._getVMVal(this.vm, this.expOrFn);
       if (value !== this.oldValue) {
           this.oldValue = value;
           this.cb(value);
       }
    }
    _getVMVal(vm: Tank, exp: any) { // 获取vm数据
        let val = vm;
        exp = exp.split('.');
        exp.forEach((k: string) => { val = val[k]; });
        return val;
    }
}