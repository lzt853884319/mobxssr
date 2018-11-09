import React from "react";
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import App from "views/App"

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
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
