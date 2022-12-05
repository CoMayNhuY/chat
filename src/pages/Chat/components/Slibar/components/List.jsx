import { onSnapshot, doc } from 'firebase/firestore';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../../Context/AuthProvider';
import { db } from '../../../../../firebase/config';
import { ChatContext } from '../../../../../Context/ChatContext';

function List() {
    const [chats, setChats] = React.useState([]);
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    React.useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            };
        };

        user.uid && getChats();
    }, [user.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    const timestamp = chats.date;
    const dateMes = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(timestamp);
    console.log(dateMes);

    return (
        <div>
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div className="list">
                        <div className="around-info" onClick={() => handleSelect(chat[1].userInfo)}>
                            <div className="avt">
                                <img src={chat[1].userInfo.photoURL} />
                                <div className="active"></div>
                            </div>
                            <div className="info">
                                <span className="name">{chat[1].userInfo.displayName}</span>
                                <span className="message">{chat[1].lastMessage?.text}</span>
                            </div>
                            <div className="time">
                                <span className="time-mes">{dateMes}</span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default List;
