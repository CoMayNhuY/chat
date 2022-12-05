import React from 'react';

import HeadChat from './components/HeadChat';
import Messages from './components/Messages';
import Send from './components/Send';
function Chat() {
    return (
        <div className="chat">
            <HeadChat />
            <Messages />
            <Send />
        </div>
    );
}

export default Chat;
