import React from "react";
import {
    observer,
    inject,
} from "mobx-react";


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
                <input type="text" onChange={this.changeName} />
                {this.props.appState.msg}
            </div>
        )
    }
}
