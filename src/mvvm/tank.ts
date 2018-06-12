import { Options } from './options';
import { Observer } from './observer';
import { Compile } from './compile';

export class Tank {
    data: any;
    $options: Options;
    $compile: Compile;
    constructor(options: Options) {
        this.$options = options;
        this.data = options.data;
        Object.keys(this.data).forEach((key) => { {
            if (this.data.hasOwnProperty(key)) {
                this._proxy(key);
            }
        }});
        new Observer(this.data);
        this.$compile = new Compile(this.$options.el, this);
    }
    _proxy(key: string) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function() {
                return this.data[key];
            },
            set: function(newVal) {
                this.data[key] = newVal;
            }
        });
    }
}