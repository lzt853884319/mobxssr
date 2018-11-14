import {
    observable,
    computed,
    action,
} from "mobx";

export default class AppState {
    constructor({ count, name } = { count: 0, name: "lzt" }) {
        this.count = count;
        this.name = name;
    }

    @observable count;

    @observable name;

    @computed get msg() {
        return `${this.name} show count is ${this.count}`
    }

    @action changeName(value) {
        this.name = value;
    }

    toJSON() {
        return {
            count: this.count,
            name: this.name,
        }
    }
}
