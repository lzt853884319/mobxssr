import React from "react";
import axios from "axios";

/* eslint-disable */
export default class TestApi extends React.Component {
    componentDidMount() {
        // do
    }

    getTopics() {
        axios.get("/api/topics")
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getLogin() {
        axios.post("/api/user/login", {
            accessToken: "bec50360-bb0e-4a96-bb0b-b38a137f2742",
        })
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getMarkAll() {
        axios.get("/api/message/mark_all?needAccessToken=true", {
            accessToken: "bec50360-bb0e-4a96-bb0b-b38a137f2742",
        })
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.getTopics}>topics</button>
                <button type="button" onClick={this.getLogin}>login</button>
                <button type="button" onClick={this.getMarkAll}>markAll</button>
            </div>
        )
    }

}
/* eslint-enable */
