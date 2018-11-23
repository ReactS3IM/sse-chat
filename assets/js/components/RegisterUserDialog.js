import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import {setCurrentUser} from '../actions/user';
import {bindActionCreators} from 'redux';

class RegisterUserDialog extends Component {
    static propTypes = {
        setCurrentUser: PropTypes.func.isRequired,
    };

    state = {
        email: null,
    };

    onClick() {
        this.props.setCurrentUser(this.state.email);
    }

    onInputChange(e) {
        this.setState({email: e.target.value});
    }

    render() {
        return (
            <Dialog
                open={true}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Connexion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez saisir votre addresse e-mail
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Adresse e-mail"
                        type="email"
                        fullWidth
                        onChange={this.onInputChange.bind(this)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClick.bind(this)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
    }),
)(RegisterUserDialog);
