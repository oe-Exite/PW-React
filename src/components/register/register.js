import React, { Component } from 'react';
import { AuthContext, AuthProvider } from '../../services/auth-service';
import RegisterForm from './register-form'
import styles from './register.module.scss';

export default class Register extends Component {

    static contextType = AuthContext;

    registerUser = (newUser) => {
        console.log('newUser', newUser);
        console.log('this.context', this.context);
        // this.context.register(this.state).then((res) => {
        //     console.log('register component res', res);
        //     this.props.history.push('/')
        // });
    }

    render() {
        return (
            <AuthProvider>
                <RegisterForm registerUser={this.registerUser}></RegisterForm>
            </AuthProvider>
        );
    }
}
