import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import styles from './login.module.scss';

class LoginForm extends Component {

    static contextType = AuthContext;

    state = {
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
        this.context.login(this.state).then((res) => {
            console.log('login component res', res);
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className={styles.login}>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.login__control}>
                        <input className={styles.login__input} type="email" name="email" placeholder="Email" required
                            value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className={styles.login__control}>
                        <input className={styles.login__input} type="password" name="password" placeholder="Password" required
                            value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <div className={styles.login__control}>
                        <input className={styles.login__btn} type="submit" value="Login"/>
                    </div>
                    <div className={styles.login__control}>
                        <NavLink to="/register">Register</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm)
