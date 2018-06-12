import { Tank } from './mvvm/tank';

new Tank({
    el: '#mvvm-app',
    data: {
        age: 27,
        name: 'wulei'
    },
    methods: {
        nameInput: function (e: any) {
            this.name = e.target.value;
        },
        wordInput: function(e: any) {
            this.age = e.target.value;
        },
        sayHi: function(e: any) {
            console.log(this.data);
        }
    }
});