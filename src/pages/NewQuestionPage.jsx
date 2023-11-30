import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";
import skillsList from '../assets/skillList.json'


  const NewQuestion = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const API_URL = "http://localhost:5005/api/questions"


    const handleSubmit=(e)=>{
        const requestBody = {postedBy: user.name, title, description}
        e.preventDefault();

        axios.post(API_URL, requestBody)
        .then(()=>{
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className="margin-div">
            <form className="question-form" onSubmit={handleSubmit}>
                <div className="question-form-title">
                    <input placeholder="Question Title" type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} maxLength={35}
                    style={{width:"20vw"}}/>
                    <p>{title.length}/35</p>
                </div>
                <div className="question-form-description">
                    <input placeholder="Your question description..." type="text" name="description" value={description} onChange={(e)=> setDescription(e.target.value)} 
                    style={{width:"60vw", height:"20vh"}} maxLength={500}/>
                    <p>{description.length}/500</p>
                </div>
                <div className="question-form-select">
                    <p>Skill's Tags</p>
                    <select>
                    {skillsList.map((skill)=>{
                        return(<option>{skill}</option>)
                    })}
                    </select>
                    <select>
                    {skillsList.map((skill)=>{
                        return(<option>{skill}</option>)
                    })}
                    </select>
                <button style={{width:"200px"}}>Sumbit Question</button>

                </div>
                </form>
        </div>
    )
  }

  export default NewQuestion;