import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import skillsList from '../assets/skillList.json'

const EditQuestionForm = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [solved, setSolved] = useState('');
    const skills =[skill1, skill2] || [skill1] ||  [];
    const navigate = useNavigate();
    const {questionId, postedBy, defaultTitle, defaultDescription, defaultSkill1, defaultSkill2, defaultSolved} = props;

    useEffect(()=>{
        setTitle(defaultTitle);
        setDescription(defaultDescription);
        setSkill1(defaultSkill1);
        setSkill2(defaultSkill2);
        setSolved(defaultSolved)
    },[])

    const API_URL = "https://saviour.adaptable.app";
    
    const requestBody = {
        postedBy: postedBy,
        title: title,
        skills: skills,
        description: description,
        solved: solved
    }

    const handleSubmit = () =>{
        axios.put(`${API_URL}/api/questions/${questionId}`, requestBody)
        navigate(`/my-questions`)
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
                <input
                    placeholder="Your question description..."
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => {
                    setDescription(e.target.value)}}
                    style={{width:"60vw", height:"20vh"}} maxLength={500}/>
                    <p>{description.length}/500</p>
                </div>
                <div className="question-form-select">
                    <p>Skill's Tags</p>
                    <select key="skill-one" onChange={(e)=> setSkill1(e.target.value)} value={skill1}>
                    {skillsList.map((skill)=>{
                        return(<option>{skill}</option>)
                    })}
                    </select>
                    <select key="skill-two" onChange={(e)=> setSkill2(e.target.value)} value={skill2}>
                    {skillsList.map((skill)=>{
                        return(<option>{skill}</option>)
                    })}
                    </select>
                </div>
                <div style={{display: "flex"}}>
                <button type="submit" > Done</button>
                </div>
                </form>
        </div>
  );
};

export default EditQuestionForm;