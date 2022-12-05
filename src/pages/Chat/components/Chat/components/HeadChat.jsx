import { useContext } from 'react';
import { ChatContext } from '../../../../../Context/ChatContext';

function HeadChat() {
    const { data } = useContext(ChatContext);
    console.log(data.userContext);

    return (
        <div className="head-chat">
            <div className="head-info">
                <i class="fa-solid fa-chevron-left"></i>
                <div className="left">
                    <div className="avt">{data.userContext?.photoURL && <img src={data.userContext?.photoURL} />}</div>
                    <div className="info">
                        {data.userContext?.displayName && <span className="name">{data.userContext?.displayName}</span>}
                        {data.userContext?.photoURL && <span className="message">Active now</span>}
                    </div>
                </div>
            </div>
            <div className="head-call">
                <div className="icon-call">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <div className="icon-list">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        </div>
    );
}

export default HeadChat;
