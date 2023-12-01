import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import dateGenerator from "../components/dateGenerator";
import skillsList from '../assets/skillList.json'

const EditQuestionForm = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user} = useContext(AuthContext);
    const skills =[];
    const navigate = useNavigate();
    const date = dateGenerator();
    const {questionId} = props;

    const API_URL = "http://localhost:5005";

    const handleSelect = () => {
        console.log("editing")
    }

    const handleSubmit = () =>{
        navigate(`/`)
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
                    <select key="skill-one" onChange={(e)=>handleSelect(e.target.value)}>
                    {skillsList.map((skill)=>{
                        return(<option>{skill}</option>)
                    })}
                    </select>
                    <select key="skill-two" onChange={(e)=>handleSelect(e.target.value)}>
                    {skillsList.map((skill)=>{
                        return(<option>{skill}</option>)
                    })}
                    </select>
                <button style={{width:"200px"}}> Done</button>

                </div>
                </form>
        </div>
  );
};

export default EditQuestionForm;