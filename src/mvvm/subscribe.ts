export class Subscribe {
    private uid = 0;
    subQueue: any[] = [];
    constructor() {
        this.uid++;
    }
    addSub (sub: any) {
        this.subQueue.push(sub);
    }
    notify() {
        this.subQueue.forEach((sub) => {
            sub.update();
        })
    }
}