import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import { withRouter } from 'react-router-dom';
import UserService from '../../services/user-service';
import TransactionsTable from '../transactions-list/transactions-list';
import TransactionForm from '../transaction-form/transaction-form';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './profile.module.scss';

class Profile extends Component {
    static contextType = StateContext;

    state = {
        selectedTransaction: null,
        isLoaded: false
    }

    componentDidMount() {
        const [{}, dispatch] = this.context;
        UserService.getUserinfo(dispatch).then((res) =>
            UserService.getUserTransactions(dispatch)
        )
        .then(() => {
            this.setState({isLoaded: true});
        })
        .catch((error) =>
            this.props.history.push('/login')
        )
    }

    handleTransactionSelect = (transaction) => {
        this.setState({
            selectedTransaction: transaction ? { ...transaction, amount: Math.abs(transaction.amount) } : null
        });
    }

    newTransaction = () => {
        this.setState({
            selectedTransaction: { username: '', amount: 1 }
        });
    }

    render() {
        const [{ user, transactions }, dispatch] = this.context;
        if (!this.state.isLoaded) {
            return <CircularProgress />;
        } else {
            return (
                <div className={styles.profile}>
                    <div className={styles.profile__part}>
                        <div className={styles.profile__header}>
                            <h2>Hello, {user.name}! Your balance is {user.balance}</h2>
                            <Button variant="contained" color="primary" onClick={this.newTransaction}>
                                Create transaction
                            </Button>
                        </div>
                        { transactions && transactions.length > 0 
                        ?
                            <TransactionsTable rows={transactions} onTransactionSelect={this.handleTransactionSelect}/>
                        : 
                        
                            <h3 className={styles.profile__notransactions}>You don't have transactions yet</h3>
                         }
                    </div>
                    { this.state.selectedTransaction &&
                        <TransactionForm className={styles.profile__part}
                            selectedTransaction={this.state.selectedTransaction} onTransactionClose={this.handleTransactionSelect}/>
                    }
                </div>
            );
        }
    }
}

export default withRouter(Profile)