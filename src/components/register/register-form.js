import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './register.module.scss';

export default class RegisterForm extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    constructor(props) {
        super(props);
        this.passInput = React.createRef();
    }

    isPasswordCorrect() {
        const input = this.passInput.current;
        console.log(this.state.password, this.state.confirmPassword);
        const isCorrect = this.state.password === this.state.confirmPassword;
        if (isCorrect) {
            // input is valid -- reset the error message
            input.setCustomValidity('');
        } else {
            input.setCustomValidity('Passwords don\'t match.');
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
        console.log('Form value', this.state);
        event.preventDefault();
        if (this.isPasswordCorrect()) {
            this.props.registerUser(this.state);
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
            </div>
        );
    }
}
