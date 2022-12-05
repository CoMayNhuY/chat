import { auth } from '../../../../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../../../Context/AuthProvider';

function HeadSlibar() {
    const nav = useNavigate();
    async function handleLogout() {
        await auth.signOut();
        nav('/login');
    }

    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="head-slibar">
            <img src={user.photoURL} class="dropdown-toggle" data-bs-toggle="dropdown" />
            <ul
                class="dropdown-menu"
                style={{
                    backgroundColor: '#669999',
                    cursor: 'pointer',
                }}
            >
                <li
                    onClick={handleLogout}
                    style={{
                        color: '#fff',
                        fontWeight: 600,
                        marginLeft: 10,
                    }}
                >
                    Log out
                </li>
            </ul>

            <i class="fa-solid fa-bars-staggered"></i>
        </div>
    );
}

export default HeadSlibar;
