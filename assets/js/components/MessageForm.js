import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {sendChatMessage} from '../actions/messages';

class MessageForm extends Component {
    static propTypes = {
        sendChatMessage: PropTypes.func.isRequired,
    };

    textInput;

    onSubmit(e) {
        e.preventDefault();

        this.props.sendChatMessage(this.textInput.value);
        this.textInput.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    id="filled-full-width"
                    style={{ margin: 8 }}
                    placeholder="Message"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputRef={ref => this.textInput = ref}
                />
            </form>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        sendChatMessage: message => dispatch(sendChatMessage('yohan@un-zero-un.fr', message)),
    })
)(MessageForm);
