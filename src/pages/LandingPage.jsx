import React from 'react';
import {useNavigate} from 'react-router-dom';


const LandingPage = () => {

    const navigate = useNavigate();

    const goToLogin = () =>{
        navigate('/login')
    }

    const goToSignUp = () =>{
        navigate('/signup')
    }


    return(<div>
        <h1>Welcome to Saviour!</h1>
        <button onClick={goToLogin}>Login</button>
        <button onClick={goToSignUp}>Sign Up</button>
    </div>)
}

export default LandingPage