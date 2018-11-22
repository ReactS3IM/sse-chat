import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {chatMessageReceived} from '../actions/messages';
import {bindActionCreators} from 'redux';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

class App extends Component {
    static propTypes = {
        chatMessageReceived: PropTypes.func.isRequired,
    };

    async componentDidMount() {
        await fetch('http://chat.1z1.fr/', {credentials: 'include'});
        const url = new URL('http://chat.1z1.fr/hub');
        url.searchParams.append('topic', 'general');
        const eventSource = new EventSource(url);

        eventSource.addEventListener('message', this.props.chatMessageReceived);
    }

    render() {
        return (
            <div>
                <MessageList />
                <MessageForm />
            </div>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        chatMessageReceived: bindActionCreators(chatMessageReceived, dispatch),
    }),
)(App);
