import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import { userReducer } from "./core/reducers/user"
import { StateProvider } from "./core/state/StateProvider"
import Login from "./login/Login";
import Main from "./main/Main";

class App extends Component {
    initialState = {
        user: { primary: 'green' }
    };

    render() {
        return (
            <StateProvider initialState={this.initialState} reducer={userReducer}>
                <BrowserRouter>
                    <div>
                        <h1>Simple SPA</h1>
                        <ul className="header">
                            <li><NavLink to="/">Main</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                        <div className="content">
                            <Route exact path="/" component={Main}/>
                            <Route path="/login" component={Login}/>
                        </div>
                    </div>
                </BrowserRouter>
            </StateProvider>
        );
    }
}

export default App;
