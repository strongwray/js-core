import { Compile } from './mvvm/compile';
import { Observer } from './mvvm/observer';

const demo = { 
    name: 'wulei',
    age: 333,
    job: ['it', 'player'],
    area: {
        province: 'sichuan',
        city: 'chengdu'
    }
};
new Observer(demo);

new Compile({
    el: '#mvvm-app',
    data: {
        word: 'wulei'
    },
    methods: {
        wordInput(e: any) {
            console.log(e.target.value);
        },
        sayHi() {
            console.log('hello world');
        }
    }
});