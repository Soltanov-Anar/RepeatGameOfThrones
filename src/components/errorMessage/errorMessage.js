import React from 'react';
import './errorMessage.css';
//import img from './error.jpg;
const ErrorMessage = () => {
    return (
        <>
            <img
                id='imgjpg' 
                src={process.env.PUBLIC_URL + '/img/error3.jpg'}
                alt='Ошибка'
            >
            </img>
            <span><p>Error. Try again later.</p></span>
        </>
    )
}

export default ErrorMessage;

