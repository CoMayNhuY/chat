import React from 'react';

import './ChatHome.scss';
import Slibar from './components/Slibar/Slibar';
import Chat from './components/Chat/Chat';

function ChatHome() {
    return (
        <div className="home">
            <div className="container-chat-home">
                <Slibar />
                <Chat />
            </div>
        </div>
    );
}

export default ChatHome;
