import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import styles from './register.module.scss';

export default class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null
    }

    constructor(props) {
        super(props);
        this.passInput = React.createRef();
    }

    componentDidMount() {
        AuthService.isLoggedIn() && this.props.history.push('/');
    }

    isPasswordCorrect() {
        const isCorrect = this.state.password === this.state.confirmPassword;
        if (!isCorrect) {
            this.setState({
                error: 'Passwords don\'t match.'
            })
        }
        return isCorrect;
    }

    passChange = (event) => {
        this.handleChange(event);
        const input = this.passInput.current;
        input.setCustomValidity('');
    }
    
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isPasswordCorrect()) {
            const {confirmPassword, error, ...data} = this.state;
            AuthService.register(data).then((res) => {
                this.props.history.push('/')
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data
                });
            });
        }
    }

    render() {
        return (
            <div className={styles.register}>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.register__control}>
                        <input className={styles.register__input} type="text" name="username" placeholder="Username" required
                            value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className={styles.register__control}>
                        <input className={styles.register__input} type="email" name="email" placeholder="Email" required
                            value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className={styles.register__control}>
                        <input className={styles.register__input} type="password" name="password" placeholder="Password" required
                            value={this.state.password} onChange={this.passChange}/>
                    </div>
                    <div className={styles.register__control}>
                        <input className={styles.register__input} type="password" name="confirmPassword" placeholder="Confirm Password" required
                            value={this.state.confirmPassword} onChange={this.passChange} ref={this.passInput}/>
                    </div>
                    <div className={styles.register__control}>
                        <input className={styles.register__btn} type="submit" value="Register"/>
                    </div>
                    <div className={styles.register__control}>
                        <NavLink to="/login">To Login</NavLink>
                    </div>
                </form>
                { this.state.error &&
                    <div className={styles.register__error}>
                        {this.state.error}
                    </div>
                }
            </div>
        );
    }
}
