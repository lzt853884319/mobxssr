import {
    observable,
    computed,
    autorun,
    action
} from "mobx";

class AppState {
    @observable count = 0;
    @observable name = "gzxzz";
    @computed get msg() {
        return `${this.name} show count is ${this.count}`
    }
    @action add() {
        this.count++;
    }
}
const appState = new AppState;

autorun(() => {
    console.log(appState.msg)
});

setInterval(() => {
    appState.add()
})


export default appState;
