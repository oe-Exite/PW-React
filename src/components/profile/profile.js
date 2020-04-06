import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import { withRouter } from 'react-router-dom';
import UserService from '../../services/user-service';
import styles from './profile.module.scss';

class Profile extends Component {
    static contextType = StateContext;

    componentDidMount() {
        const [{ user }, dispatch] = this.context;
        UserService.getUserinfo(dispatch).catch((error) => {
            console.log('userRequest error:', error);
            this.props.history.push('/login');
        })
        //.finally(() => this.setState({isLoaded: true}));
    }

    render() {
        const [{ user, transactions }, dispatch] = this.context;
        if (!user) {
            return null;
        } else {
            return (
                <div>
                    <h1>Hello, {user.name}! Your balance is {user.balance}</h1>
                    { transactions && transactions.length > 0 ?
                        <div>table</div>
                    : <span>You don't have transactions yet</span> }
                </div>
            );
        }
    }
}

export default withRouter(Profile)