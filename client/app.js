import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, pink } from "@material-ui/core/colors"
import App from "views/App";
import { Provider } from "mobx-react";

import { BrowserRouter } from "react-router-dom";

import AppState from "store/app-state";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: lightBlue,
        accent: pink,
        type: "light",
    },
})

const initialState = window.__INITAL__STATE__ || {}; // eslint-disable-line

const createApp = (TheApp) => {
    class Main extends React.Component {
    // Remove the server-side injected CSS.
        componentDidMount() {
            const jssStyles = document.getElementById("jss-server-side");
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            return <TheApp />
        }
    }
    return Main;
}

const root = document.getElementById("root")
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider appState={new AppState(initialState.appState)}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <Component />
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    )
}

render(createApp(App))
if (module.hot) {
    module.hot.accept("./views/App", () => {
        render(App)
        const NextApp = require("./views/App"); // eslint-disable-line
        render(createApp(NextApp));
    })
}
