import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { collection, query, where, getDoc, getDocs, updateDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../../../firebase/config';

import { useContext } from 'react';
import { AuthContext } from '../../../../../Context/AuthProvider';

import List from './List';
function ListChat() {
    const [username, setUsername] = React.useState('');
    const [userFind, setUserfind] = React.useState(null);
    const [err, setErr] = React.useState(false);

    const { user } = useContext(AuthContext);

    const handSeach = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));
        try {
            const docs = await getDocs(q);
            docs.forEach((doc) => {
                setUserfind(doc.data());
            });
        } catch {
            setErr(true);
        }
    };
    const handleKey = (e) => {
        e.code === 'Enter' && handSeach();
    };

    const handleSelect = async () => {
        //chats in firestore exits, if not -> create
        const combinedId = user.uid > userFind.uid ? user.uid + userFind.uid : userFind.uid + user.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create users chats
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: userFind.uid,
                        displayName: userFind.displayName,
                        photoURL: userFind.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
                await updateDoc(doc(db, 'userChats', userFind.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {
            console.log(err.messages);
        }
        setUserfind(null);
        setUsername('');
    };

    return (
        <Scrollbars style={{ width: '100%', height: '88%' }}>
            <div className="list-chat">
                {/* input search */}
                <div className="input">
                    <input
                        placeholder="search"
                        onKeyDown={handleKey}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>

                <div className="search-in-list">
                    {userFind && (
                        <div className="around-info" onClick={handleSelect}>
                            <div className="avt">
                                <img src={userFind.photoURL} />
                                <div className="active"></div>
                            </div>
                            <div className="info">
                                <span className="name">{userFind.displayName} </span>
                            </div>
                        </div>
                    )}
                </div>

                <List />
            </div>
        </Scrollbars>
    );
}

export default ListChat;
