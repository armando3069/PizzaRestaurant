import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            console.log('Tokenul există:', token);
            navigate('/account');
        } else {
            console.log('Tokenul nu există. Redirecționare la pagina de login.');
            navigate('/auth/login');
        }
    }, [navigate]); 

}

export default Auth;