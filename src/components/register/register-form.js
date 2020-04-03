import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../services/auth-service';
import { withRouter } from 'react-router-dom';
import styles from './register.module.scss';

class RegisterForm extends Component {

    static contextType = AuthContext;

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
            const {confirmPassword, ...data} = this.state;
            this.context.register(data).then((res) => {
                console.log('register component res', res);
                this.props.history.push('/')
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
            </div>
        );
    }
}

export default withRouter(RegisterForm)
