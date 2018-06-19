interface PromiseFunc {
    (resolve: ResolveFunc, reject: RejectFunc): void;
}
interface ResolveFunc {
    (value?: any): void;
}
interface RejectFunc {
    (error?: any): void;
}

export class mPromise {
    status = 'pending'; // 未完成pending 成功fulfilled 失败rejected
    value: any;
    error: Error;
    onFulfilled: ResolveFunc;
    onRejected: RejectFunc;
    constructor(cb: PromiseFunc) {
        cb(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(value: any) {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilled(value);
    }
    reject(error: Error) {
        this.status = 'rejected';
        this.error = error;
        if (this.onRejected) {
            this.onRejected(error);
        }
    }
    then(onFulfilled: ResolveFunc, onRejected?: RejectFunc): mPromise {
        this.onFulfilled = onFulfilled;
        if (onRejected) { this.onRejected = onRejected; };
        return this;
    }
    catch(cb: ResolveFunc): mPromise  {
        return this.then(cb);
    }
}