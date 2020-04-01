import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import styles from './profile.module.scss';

export default class Profile extends Component {
    static contextType = StateContext;

    render() {
        const [{ user }, dispatch] = this.context;
        return (
            <span>Main page {user.primary}</span>
        );
    }
}