import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "views/App";
import { Provider } from "mobx-react";

import { BrowserRouter } from "react-router-dom";

import AppState from "store/app-state";

const initialState = window.__INITAL__STATE__ || {}; // eslint-disable-line

const root = document.getElementById("root")
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider appState={new AppState(initialState.appState)}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    )
}

render(App)
if (module.hot) {
    module.hot.accept("./views/App", () => {
        render(App)
        const NextApp = require("./views/App"); // eslint-disable-line
        render(NextApp);
    })
}
