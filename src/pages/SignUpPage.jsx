import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import skillsList from '../assets/skillList.json'


const API_URL = "https://saviour.adaptable.app/";

function SignUpPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const skills = [];
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {

        e.preventDefault();
        const name = firstName+" "+lastName
        const requestBody = {email, password, name};

        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then(()=>{
                console.log(requestBody)
                navigate('/login');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                setError(errorDescription);
            })
    }

return(
    <div className='margin-div'>
        <h1>Sign-up Page</h1>
        <form onSubmit = {handleSignUpSubmit}>
            <div> 
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div> 
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div> 
                <label>Username:</label>
                <input type="text" name="username" value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div>
                <div>
                <label>Skills:</label>
                {skillsList.map((skill)=>{
                        return( 
                            skill !== "none" &&
                            <div key={skill}>
                                <label>{skill}</label>
                                <input type="checkbox" value={skill} onChange={(e)=>handleCheckBox(e.target.value)}></input>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {skills.lenght !==0 && skills.map((skill)=>{
                        return(
                        <p>{skill}</p>
                        )
                    })}
                </div>
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            {error && <p>{error}</p>}
        </form>
    </div>)

}

export default SignUpPage;