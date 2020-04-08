import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import styles from './login.module.scss';

class LoginForm extends Component {

    static contextType = AuthContext;

    state = {
        email: '',
        password: '',
        error: null
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
        const {error, ...data} = this.state;
        this.context.login(data).then((res) => {
            this.props.history.push('/');
        })
        .catch((error) => {
            this.setState({
                error: error.response.data
            });
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
                { this.state.error &&
                    <div className={styles.login__error}>
                        {this.state.error}
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(LoginForm)
