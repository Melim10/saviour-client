import { useState} from "react";
import {useNavigate} from 'react-router-dom';


const SignUpPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [userName,setUserName] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    return(<div>
        <form onSubmit={handleSubmit}>
            <input type="userName" name="userName" value={userName} placeholder="User Name" onChange={(e)=> setUserName(e.target.value)}></input>
            <input type="email" name="email" value={email} placeholder="Your Email" onChange={(e)=> setEmail(e.target.value)}></input>
            <input type="password" name="password" value={password} placeholder="Your Password" onChange={(e)=> setPassword(e.target.value)} ></input>
            <button type="submit">Go</button>
        </form>
    </div>)
}

export default SignUpPage;