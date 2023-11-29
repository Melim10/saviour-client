import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

const QuestionCardDetails = () =>{

    const {questionId} = useParams();
    const [question,setQuestion] = useState({});
    const API_URL = `http://localhost:5005/api/questions/${questionId}`

    useEffect(()=>{
        axios.get(API_URL)
        .then((response) => {
            setQuestion(response.data)
            console.log(response.data)
        })
        .catch((error)=> console.log(error))
    },[])


    return(<div>
        <NavBar/>
        <h2>{question.title}</h2>
        <h3>Posted by: {question.postedBy}</h3>
        <p>{question.description}</p>
        <h4>Context: {question.skills}</h4>
        <h4>Answers:</h4>
    </div>)

}

export default QuestionCardDetails;