import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import { withRouter } from 'react-router-dom';
import { getUserinfo } from '../../services/user-service';
import styles from './profile.module.scss';

class Profile extends Component {
    static contextType = StateContext;

    componentDidMount() {
        const [{ user }, dispatch] = this.context;
        getUserinfo(dispatch).catch((error) => {
            console.log('userRequest error:', error);
            this.props.history.push('/login');
        })
        //.finally(() => this.setState({isLoaded: true}));
    }

    render() {
        const [{ user }, dispatch] = this.context;
        if (!user) {
            return null;
        } else {
            return (
                <div>
                    <span>Hello, {user.name}</span>
                </div>
            );
        }
    }
}

export default withRouter(Profile)