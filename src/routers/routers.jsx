import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ChatHome from '../pages/Chat/ChatHome';

import AuthProvider from '../Context/AuthProvider';
import { ChatContextProvider } from '../Context/ChatContext';

const routes = [
    {
        id: 1,
        path: '/',
        element: Register,
    },
    {
        id: 2,
        path: '/login',
        element: Login,
    },
    {
        id: 3,
        path: '/chat',
        element: ChatHome,
    },
];

function Routers() {
    return (
        <AuthProvider>
            <ChatContextProvider>
                <Routes>
                    {routes.map((item) => (
                        <Route key={item.id} exact element={<item.element />} path={item.path} />
                    ))}
                </Routes>
            </ChatContextProvider>
        </AuthProvider>
    );
}

export default Routers;
