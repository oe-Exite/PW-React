import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { StateContext } from '../../core/state/state-provider';
import styles from './header.module.scss';

export default class Header extends Component {
    static contextType = StateContext;

    render() {
        const [{ user }, dispatch] = this.context;
        return (
            <div className={styles.header}>
                <span className={styles.header__title}>Parrot Wings</span>
                <span>{user.primary}</span>
                <NavLink to="/">Profile</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        );
    }
}
