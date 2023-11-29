import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

const QuestionCardDetails = () =>{

    const {questionId} = useParams();
    const [question,setQuestion] = useState({});
    const [posting, setPosting] = useState(false);
    const [answer,setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const API_URL = `http://localhost:5005/api/questions/${questionId}`

    useEffect(()=>{
        axios.get(API_URL)
        .then((response) => {
            setQuestion(response.data)
            setLoading(false)
        })
        .catch((error)=> console.log(error))
    },[])


    const handleClick = () => {
        const form = document.getElementById('answer-form')
        const button = document.getElementById('answer-button')

        if(!posting){
        setPosting(true)
        form.style.display = "inline"
        button.innerHTML = "Post"
        }
        else{
        setPosting(false)
        const requestBody = {answers: answer}   
        axios.put(API_URL, requestBody)

        form.style.display = "none"
        button.innerHTML = "New Answer"
        setAnswer("")
        }
    }

    return(<div>
        <NavBar/>
        {!loading ? (
        <div  className="margin-div">
            <h2>{question.title}</h2>
            <h3>Posted by: {question.postedBy}</h3>
            <p>{question.description}</p>
            <h4>Context: {question.skills}</h4>
            <h4>Answers:</h4>
            {question.answers.map((answer)=>{
                return(<p>{answer}</p>)
            })}
            <form id="answer-form" style={{display: "none"}} >
                <input type="text" value={answer} onChange={(e)=> setAnswer(e.target.value) }></input>
            </form>
            <button id="answer-button" onClick={handleClick}>New Answer</button>
        </div>
        )
        :(
        <h1>loading</h1>)}
    </div>)

}

export default QuestionCardDetails;