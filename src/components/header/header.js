import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import { bearerToken } from '../../core/api-service';
import { logout } from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import styles from './header.module.scss';

class Header extends Component {
    static contextType = StateContext;

    logoutUser = () => {
        const [{ user }, dispatch] = this.context;
        logout(this.props.history, dispatch);
    }

    render() {
        const [{ user }, dispatch] = this.context;
        return (
            <div className={styles.header}>
                <span className={styles.header__title}>Parrot Wings</span>
                { user &&
                    <div className={styles.header__user}>
                        <span className={styles.header__user_item}>{user.name}</span>
                        <a className={styles.header__user_item} href="#" onClick={this.logoutUser}>Logout</a>
                    </div> 
                }
            </div>
        );
    }
}
export default withRouter(Header)