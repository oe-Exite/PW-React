import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from './register.module.scss';

export default class Register extends Component {

    state = {
        username: '',
        email: '',
        password: ''
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
                            value={this.state.password} onChange={this.handleChange}/>
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
