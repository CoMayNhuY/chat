import { onSnapshot, updateDoc, doc } from 'firebase/firestore';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../../Context/AuthProvider';
import { ChatContext } from '../../../../../Context/ChatContext';
import { db } from '../../../../../firebase/config';

function MessageChat({ message }) {
    const { data } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    const ref = React.useRef();
    React.useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unSub();
        };
    }, [data.chatId]);
    const xoa = async () => {
        try {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: messages.filter((m) => m.id !== message.id),
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const timestamp = message.date;
    const dateMes = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(timestamp);
    console.log(dateMes);

    return (
        <div className={`message-chat ${message.senderId === user.uid && 'owner-chat'}`} ref={ref}>
            <div className="mess-info">
                <img src={message.senderId === user.uid ? user.photoURL : data.userContext.photoURL} alt="" />
            </div>
            <div className="mess-content">
                {message.text && <div className="around-text">{<p>{message.text}</p>}</div>}
                {message.img && <img src={message.img} alt="File gửi không đúng định dạng là ảnh" />}
            </div>
            <span>{dateMes}</span>
            <p
                className="delete"
                onClick={() => {
                    xoa();
                }}
            >
                delete
            </p>
        </div>
    );
}

export default MessageChat;
