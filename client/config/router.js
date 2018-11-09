import React from "react";

import {
    Route,
    Redirect,
} from "react-router-dom";
import TopicList from "views/topic-list"
import TopicDetail from "views/topic-detail"

export default () => [
    <Route path="/" key="routerIndex" render={() => <Redirect to="/list" />} exact />,
    <Route path="/list" key="routerList" component={TopicList} />,
    <Route path="/detail" key="routerDetail" component={TopicDetail} />,
]
