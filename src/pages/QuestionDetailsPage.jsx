import { useContext, useEffect, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import NavBar from "../components/NavBar";

const QuestionDetailsPage = () =>{

    const {questionId} = useParams();
    const [question,setQuestion] = useState({});
    const [posting, setPosting] = useState(false);
    const [answer,setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    const API_URL = `http://localhost:5005/api/questions/${questionId}`
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(API_URL)
        .then((response) => {
            setQuestion(response.data)
            setLoading(false)
        })
        .catch((error)=> console.log(error))
    },[posting,answer])


    const handleClick = () => {
        const form = document.getElementById('answer-form')
        const button = document.getElementById('answer-button')

        if(!posting){
        setPosting(true)
        form.style.display = "block"
        button.innerHTML = "Post"
        }
        else{
        const requestBody = {
            "postedBy": user.name,
            "description": answer}  
        
        requestBody.description &&(
        axios.put(`${API_URL}/answers`, requestBody))

        form.style.display = "none"
        button.innerHTML = "New Answer"
        setAnswer("")
        setPosting(false)
        }
    }

    const visitProfile = () => {
            console.log(user._id)
            navigate(`/users/${user._id}`)
        }

    return(<div>
        <NavBar/>
        {!loading ? (
        <div  className="margin-div question-details-div">
            <h2>{question.title}</h2>
            <h3 onClick={visitProfile} style={{cursor: "pointer"}}>Posted by: {question.postedBy}</h3>
            <p>{question.description}</p>
            <div className="skill-list">
            <h4>Context:</h4>
            {question.skills.length === 0 ? <p>No specific context</p> :
            question.skills.map((skills)=>{
                return(
                    <p>{skills}</p>
                )
            })}
           </div>
            <h4>Answers:</h4>
            {question.answers.map((answer)=>{
                return(
                    <div className="answer-card">
                    <h4>Posted By:{answer.postedBy}</h4>
                    <p>{answer.description}</p>
                    </div>
                )
            })}
            <form id="answer-form" style={{display: "none", width:"60vw", height:"20vh"}} >
                <input type="text" style={{width:"800px", height:"200px"}} value={answer} onChange={(e)=> setAnswer(e.target.value)} maxLength={500}></input>
                <p>{answer.length}/500</p>
            </form>
            <button id="answer-button" onClick={handleClick}>New Answer</button>
        </div>
        )
        :(
        <h1>loading</h1>)}
    </div>)

}

export default QuestionDetailsPage;