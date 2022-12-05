import React, { useContext } from 'react';
import { AuthContext } from '../../../../../Context/AuthProvider';
import { ChatContext } from '../../../../../Context/ChatContext';
import { db, storage } from '../../../../../firebase/config';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import { v4 as uuid } from 'uuid';
import InputEmoji from 'react-input-emoji';
function Send() {
    const [text, setText] = React.useState('');
    const [img, setImg] = React.useState(null);

    const { user } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        try {
            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {
                        // setErr(true);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, 'chats', data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: user.uid,
                                    date: Date.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    },
                );
            } else {
                await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: user.uid,
                        date: Date.now(),
                    }),
                });
            }

            await updateDoc(doc(db, 'userChats', user.uid), {
                [data.chatId + '.lastMessage']: {
                    text,
                },
                [data.chatId + '.date']: serverTimestamp(),
            });

            await updateDoc(doc(db, 'userChats', data.userContext.uid), {
                [data.chatId + '.lastMessage']: {
                    text,
                },
                [data.chatId + '.date']: serverTimestamp(),
            });

            setText('');
            setImg(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnter = (e) => {
        e.code === 'Enter' && handleSend();
    };

    return (
        <div className="send-chat">
            <div className="around-send">
                {/* mess: react input emoji*/}
                <InputEmoji
                    value={text}
                    onChange={setText}
                    onKeyDown={handleEnter}
                    placeholder="Type a message"
                    borderColor="white"
                />

                {/* file */}
                <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <i class="fa-solid fa-image"></i>
                </label>

                {/* send */}
                <i class="fa-sharp fa-solid fa-paper-plane" onClick={handleSend}></i>
            </div>
        </div>
    );
}

export default Send;
