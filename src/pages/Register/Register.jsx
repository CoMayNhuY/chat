import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import Head from '../components/head/Head';
import Left from '../components/left/Left';
import { auth, db, storage } from '../../firebase/config';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, query, getDocs, collection, where, addDoc, setDoc, doc } from 'firebase/firestore';

import bcrypt from 'bcryptjs';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
function Register() {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

    const handleSummit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const passwordConfirm = e.target[3].value;
        const file = e.target[4].files[0];

        if ((displayName == '' || email == '' || password == '', passwordConfirm == '' || file == null)) {
            alert('Vui lòng nhập đầy đủ thông tin!');
        } else {
            if (passwordConfirm !== password) {
                alert('Mật khẩu nhập lại không đúng!');
            } else {
                try {
                    const res = await createUserWithEmailAndPassword(auth, email, password);
                    const storageRef = ref(storage, displayName);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    uploadTask.on(
                        (error) => {
                            setErr(true);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                // await
                                updateProfile(res.user, {
                                    displayName,
                                    photoURL: downloadURL,
                                });
                                // await
                                setDoc(doc(db, 'users', res.user.uid), {
                                    uid: res.user.uid,
                                    displayName,
                                    email,
                                    photoURL: downloadURL,
                                });
                                // await
                                setDoc(doc(db, 'userChats', res.user.uid), {});
                                navigate('/login');
                            });
                        },
                    );
                    alert('Đăng ký tài khoản thành công');
                } catch (err) {
                    setErr(true);
                }
            }
        }
    };

    return (
        <div className="around-register">
            <div className="register">
                <Head />
                <div className="second">
                    <span>
                        Sign up/
                        <Link to={'./login'} className="hiddenLogin">
                            {' '}
                            Login
                        </Link>
                    </span>
                    <div className="body-register">
                        <div className="sign-up">
                            <span>Sign up</span>
                            <form className="sign-up-head" onSubmit={handleSummit}>
                                <input type="text" className="form-control form-ctrl" placeholder="Full name" />
                                <input type="email" className="form-control form-ctrl" placeholder="Email address" />
                                <input type="password" className="form-control form-ctrl" placeholder="Password" />
                                <input
                                    type="password"
                                    className="form-control form-ctrl"
                                    placeholder="Confirm Password"
                                />
                                <input style={{ display: 'none' }} type="file" id="file" />
                                <label htmlFor="file">
                                    <img src="./img/avtAdd.png" alt="" className="avt-file" />
                                    <span>Add avt</span>
                                </label>
                                <br />
                                {err && <span className="error-text">Something went wrong</span>}
                                <div className="button-register">
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

export default Register;
