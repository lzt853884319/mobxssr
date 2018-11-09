import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "views/App";
import { Provider } from "mobx-react";

import { BrowserRouter } from "react-router-dom";

import appState from "store/app-state";

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider appState={appState}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById("root"),
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
