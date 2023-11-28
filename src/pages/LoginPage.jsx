import { useState} from "react";
import {useNavigate} from 'react-router-dom';


const LoginPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/homepage')
    }

    return(<div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={email} placeholder="Your Email" onChange={(e)=> setEmail(e.target.value)}></input>
            <input type="password" name="password" value={password} placeholder="Your Password" onChange={(e)=> setPassword(e.target.value)} ></input>
            <button type="submit">Go</button>
        </form>
    </div>)
}

export default LoginPage