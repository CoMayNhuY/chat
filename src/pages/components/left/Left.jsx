import React from 'react';
import '../../style.css';
import firebase, { auth } from '../../../firebase/config';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const fbProvider = new firebase.auth.FacebookAuthProvider();
function Left() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleFbLogin = async () => {
        const signIn = await auth.signInWithPopup(fbProvider);
        if (user) {
            navigate('/chat');
        }
    };

    return (
        <>
            <div className="center">
                <div className="m">ff</div>
                <div className="h">Or</div>
                <div className="b"></div>
            </div>
            <div className="choose">
                <span>Or do you prefer to...</span>

                <button className="btn btn-login-fb" onClick={handleFbLogin}>
                    Login with <i class="fa-brands fa-facebook"></i>
                </button>
            </div>
        </>
    );
}

export default Left;
