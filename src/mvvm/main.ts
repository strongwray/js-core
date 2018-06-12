import { Tank } from './tank';
new Tank({
    el: '#mvvm-app',
    data: {
        age: 42,
        name: 'ducan',
        job: {
            name: 'player'
        }
    },
    methods: {
        nameInput: function (e: any) {
            this.name = e.target.value;
        },
        wordInput: function(e: any) {
            this.age = e.target.value;
        },
        jobNameInput: function (e: any) {
            this.job.name = e.target.value;
        },
        sayHi: function(e: any) {
            console.log(this.data);
        }
    }
});