import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from './Gravatar';

class MessageList extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            id:      PropTypes.string.isRequired,
            author:  PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            date:    PropTypes.string.isRequired,
        })).isRequired,
    };

    render() {
        return (
            <List>
                {this.props.messages.map(message => (
                    <ListItem key={message.id} divider>
                        <Avatar>
                            <Gravatar email={message.author} />
                        </Avatar>
                        <ListItemText primary={message.author} secondary={message.message}/>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default connect(
    state => ({
        messages: state.chat.messages.items,
    }),
)(MessageList);
