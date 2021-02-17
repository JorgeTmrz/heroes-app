import React from 'react'

export const LoginScreen = ({history}) => {

    const handleClick = () => {
        history.replace("/")
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
