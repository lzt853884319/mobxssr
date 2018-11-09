import React from "react";
import { hot } from "react-hot-loader";
import Routes from "config/router";
import { Link } from "react-router-dom";

class App extends React.Component {
    componentDidMount() {
        // dos
    }

    render() {
        return (
            <>
                <div>
                    <Link to="/">首页</Link>
                    &nbsp;&nbsp;
                    <Link to="/detail">详情页</Link>
                </div>
                <Routes />
            </>
        )
    }
}

export default hot(module)(App);
