import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const ChatContext = React.createContext();
export function ChatContextProvider({ children }) {
    const { user } = useContext(AuthContext);
    const INITAL_STATE = {
        chatId: 'null',
        userContext: {},
    };
    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    userContext: action.payload,
                    chatId:
                        user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid,
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = React.useReducer(chatReducer, INITAL_STATE);
    return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
}
