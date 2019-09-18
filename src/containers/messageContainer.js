import React from 'react';
import MessageTexts from '../constants/messageTexts';

class MessageContainer extends React.Component {
    render() {
        const {customizeMode, assignKeyMode, existingKeySelected} = this.props;
        let message;

        if (customizeMode) {
            message = MessageTexts.customizeMessage;
        } else if (assignKeyMode) {
            message = MessageTexts.assignKeyMessage;
        } else if (existingKeySelected) {
            message = MessageTexts.existingKeyMessage;
        }

        return (
            <div className='message-container'>
                {message && <div className='message-text'>{message}</div>}
            </div>
        );
    }
}

export default MessageContainer;