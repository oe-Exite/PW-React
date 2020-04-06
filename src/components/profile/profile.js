import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import { withRouter } from 'react-router-dom';
import UserService from '../../services/user-service';
import TransactionsTable from '../transactions-list/transactions-list';
import Button from '@material-ui/core/Button';
import styles from './profile.module.scss';

const testTransactions = [
    {id: 1, username: 'user 1', date: Date.now(), amount: -12, balance: 500},
    {id: 2, username: 'user 2', date: Date.now(), amount: 12, balance: 500},
    {id: 3, username: 'user 3', date: Date.now(), amount: -12, balance: 500},
    {id: 4, username: 'user 4', date: Date.now(), amount: 12, balance: 500},
    {id: 5, username: 'user 5', date: Date.now(), amount: -12, balance: 500},
    {id: 6, username: 'user 6', date: Date.now(), amount: 12, balance: 500},
    {id: 7, username: 'user 7', date: Date.now(), amount: -12, balance: 500},
    {id: 8, username: 'user 8', date: Date.now(), amount: -12, balance: 500},
    {id: 9, username: 'user 9', date: Date.now(), amount: -12, balance: 500},
    {id: 10, username: 'user 10', date: Date.now(), amount: -12, balance: 500},
  ];


class Profile extends Component {
    static contextType = StateContext;

    state = {
        selectedTransaction: null
    }

    componentDidMount() {
        const [{}, dispatch] = this.context;
        UserService.getUserinfo(dispatch).then((res) => {
            UserService.getUserTransactions(dispatch);
        })
        .catch((error) => {
            console.log('userRequest error:', error);
            this.props.history.push('/login');
        });
        //.finally(() => this.setState({isLoaded: true}));
    }

    handleTransactionSelect = (transaction) => {
        this.setState({
            selectedTransaction: transaction
        })
    }

    render() {
        const [{ user, transactions }, dispatch] = this.context;
        if (!user) {
            return null;
        } else {
            return (
                <div className={styles.profile}>
                    <div>
                        <h1>Hello, {user.name}! Your balance is {user.balance}</h1>
                        { testTransactions && testTransactions.length > 0 
                        ?
                            <TransactionsTable rows={testTransactions} onTransactionSelect={this.handleTransactionSelect}/>
                        : 
                        <div>
                            <span>You don't have transactions yet</span>
                            <Button variant="contained" color="primary">
                                Create transaction
                            </Button>
                        </div> }
                    </div>
                    {this.state.selectedTransaction &&
                        <div>
                            <span>Selected {this.state.selectedTransaction.username}</span>
                        </div>
                    }
                </div>
            );
        }
    }
}

export default withRouter(Profile)