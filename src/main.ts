import { mPromise } from './promise/m-promise';
import { deepCopy } from './deep-copy';
new mPromise((resolve, reject) => {
    setTimeout(function() {
        resolve('wulei');
    }, 500);
}).then((data: any) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

const obj = {
    name: 'ray',
    hello: function () {
        console.log('hello world');
    },
    job: {
        name: 'IT',
        salary: 14000
    }
};

console.log(deepCopy(obj));
 