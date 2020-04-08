import React, { Component } from "react";
import { StateContext } from '../../core/state/state-provider';
import TextField from '@material-ui/core/TextField';
import { ApiService } from '../../core/api-service';
import UserService from '../../services/user-service';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './transaction-form.module.scss';

export default class TransactionForm extends Component {

    static contextType = StateContext;

    state = {
        name: '',
        amount: 1,
        users: [],
        error: null
    };

    updateUsers(searchStr) {
        ApiService.usersList({filter: searchStr}).then((res) => {
            this.setState({
                users: res.data.map((x) => x.name)
            });
        })
    }

    componentDidMount() {
        if (this.props.selectedTransaction.id) {
            this.setState({
                name: this.props.selectedTransaction.username,
                amount: this.props.selectedTransaction.amount
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedTransaction.id !== this.props.selectedTransaction.id) {
            this.setState({
                name: this.props.selectedTransaction.username,
                amount: this.props.selectedTransaction.amount,
                error: null
            });
        }
    }
    
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    
    handleAutocompleteSelect = (event, value) => {
        this.setState({
            name: value
        });
    }

    handleAutocompleteInputChange = (event, value, reason) => {
        if (reason === 'input') {
            this.updateUsers(value);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.amount > 0) {
            const {users, ...data} = this.state;
            const [{}, dispatch] = this.context;
            UserService.createTransaction(data, dispatch).then((res) => {
                this.props.onTransactionClose(null);
                UserService.changeUserBalance(data.amount, dispatch);
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data
                });
            });
        }
    }

    handleCancel = () => {
        this.props.onTransactionClose(null);
    }

    render() {
        return (
            <div className={styles.transaction}>
                <h1>{this.props.selectedTransaction.id ? 'New Transaction based on Transaction ' + this.props.selectedTransaction.id : 'New Transaction'}</h1>
                <form onSubmit={this.handleSubmit} className={styles.transaction__form} autoComplete="off">
                    <TextField
                        className={styles.transaction__form_control}
                        label="Amount"
                        type="number"
                        name="amount"
                        required
                        inputProps={{
                            min: 1,
                        }}
                        value={this.state.amount} 
                        onChange={this.handleChange}
                    />
                    <Autocomplete
                        name="name"
                        options={this.state.users}
                        className={styles.transaction__form_control}
                        renderInput={(params) => <TextField {...params} label="Recipient" variant="outlined" />}
                        value={this.state.name}
                        onChange={this.handleAutocompleteSelect}
                        onInputChange={this.handleAutocompleteInputChange}
                    />
                    <div className={`${styles.transaction__form_control} ${styles.transaction__form_buttons}`}>
                        <Button
                            variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={this.handleCancel}
                            variant="contained">
                            Cancel
                        </Button>
                    </div>
                </form>
                { this.state.error &&
                    <div className={styles.transaction__error}>
                        {this.state.error}
                    </div>
                }
            </div>
        );
    }
}
