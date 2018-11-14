import React from "react";
import {
    observer,
    inject,
} from "mobx-react";
import Helmet from "react-helmet";

import Button from "@material-ui/core/Button";


export default @inject("appState") @observer class TopicList extends React.Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
    }


    componentDidMount() {
        // dos
    }

    bootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appState.count = 300;
                resolve(true)
            })
        })
    }

    changeName(event) {
        this.props.appState.changeName(event.target.value)
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>topic list</title>
                    <meta name="description" content="This is description" />
                    <style>
                        {`input:focus {
                            border: 1px solid red;
                        }`}
                    </style>
                </Helmet>
                <Button variant="contained" color="primary">This is a button</Button>
                <input type="text" onChange={this.changeName} />
                {this.props.appState.msg}
            </div>
        )
    }
}
