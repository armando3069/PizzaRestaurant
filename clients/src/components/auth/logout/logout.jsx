import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Șterge token-ul din localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('UserID');


        // Redirecționează utilizatorul către pagina de login
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;