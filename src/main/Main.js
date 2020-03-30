import React, { Component } from "react";
import { StateContext } from '../core/state/StateProvider';

export default class Main extends Component {
    static contextType = StateContext;

    render() {
        const [{ user }, dispatch] = this.context;
        return (
            <span>Main page {user.primary}</span>
        );
    }
}