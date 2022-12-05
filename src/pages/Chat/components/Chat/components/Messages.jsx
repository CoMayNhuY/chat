import React, { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ChatContext } from '../../../../../Context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../firebase/config';

import MessageChat from './MessageChat';
function Messages() {
    const [messages, setMessages] = React.useState([]);
    const { data } = useContext(ChatContext);

    React.useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <Scrollbars style={{ width: '100%', height: '75%' }}>
            {messages && messages.map((m) => <MessageChat message={m} key={m.id} />)}
        </Scrollbars>
    );
}

export default Messages;
