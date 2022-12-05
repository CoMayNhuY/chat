import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                // const { displayName, email, uid, photoURL } = user;
                setUser(user);
            }
        });
        // clean funtion
        return () => {
            unsubscibed();
        };
    }, [navigate]);

    return (
        <div>
            <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
        </div>
    );
}

export default AuthProvider;
