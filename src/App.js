import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import { userReducer } from "./core/reducers/user"
import { StateProvider } from "./core/state/state-provider"
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";
import Profile from "./components/profile/profile";
import Header from "./components/header/header";
import styles from './app.module.scss';

class App extends Component {
    initialState = {
        user: null,
        transactions: []
    };

    render() {
        return (
            <StateProvider initialState={this.initialState} reducer={userReducer}>
                <BrowserRouter>
                    <div className={styles.app}>
                        <Header />
                        <div className={styles.content}>
                            <Route exact path="/" component={Profile}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                        </div>
                    </div>
                </BrowserRouter>
            </StateProvider>
        );
    }
}

export default App;
