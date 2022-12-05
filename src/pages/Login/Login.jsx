import React from 'react';
import '../style.css';
import { Link } from 'react-router-dom';
import Head from '../components/head/Head';
import Left from '../components/left/Left';

import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            alert('Đăng nhập thành công!');
            navigate('/chat');
        } catch (err) {
            setErr(true);
        }
    };
    return (
        <div className="around-login">
            <div className="login">
                <Head />
                <div className="second">
                    <span>
                        <Link to={'/'} className="hiddenLogin">
                            {' '}
                            Sign up
                        </Link>
                        / Login
                    </span>
                    <div className="body-login">
                        <div className="log-in">
                            <span className="title-lg">Login</span>
                            <form className="log-in-head" onSubmit={handleSubmit}>
                                <input type="email" className="form-control form-ctrl" placeholder="Email address" />

                                <input type="password" className="form-control form-ctrl" placeholder="Password" />
                                {err && <span className="error-text">Something went wrong</span>}
                                <div className="button-login">
                                    <button className="btn btn-re">Let's Go</button>
                                </div>
                            </form>
                        </div>
                        <Left />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
