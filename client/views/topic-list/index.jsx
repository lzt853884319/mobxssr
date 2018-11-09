import React from "react";
import {
    observer,
    inject,
} from "mobx-react";


export default @inject("appState") @observer class TopicList extends React.Component {
    componentDidMount() {
        // dos
    }

    render() {
        return (
            // <div>{this.props.appState.msg}</div>
        )
    }
}
