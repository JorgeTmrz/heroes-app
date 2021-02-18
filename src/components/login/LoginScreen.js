import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = () => {

    const lastPath = localStorage.getItem("lastPath") || "/"

    const history = useHistory();
    const {dispatch} = useContext(AuthContext);
    const handleClick = () => {
        dispatch({
            type: types.login,
            payload: {
                name: "Jorge"
            }
        })
        
        history.replace(lastPath);
    }

    return (
        <div className = "container mt-5">
            <h1>Login</h1>
            <hr/>
            <button 
                className = "btn btn-outline-primary"
                onClick = {handleClick}
            >
                Log In
            </button>
        </div>
    )
}
