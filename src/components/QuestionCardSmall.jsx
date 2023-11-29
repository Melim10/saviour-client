import { useState } from "react";
import axios from "axios";

const QuestionCard = () =>{


    const [question,setQuestion] = useState({});
    const Q_URL = "http://savioursavioursaviour"

    axios.get(Q_URL)
    .then((response) => {
        setQuestion(response.data)
    })
    .catch((error)=> console.log(error))

    return(<div>
        <h3>Posted by: {question.postedBy}</h3>
        <h4>Context: {question.skills}</h4>
        <p>{question.details}</p>
    </div>)

}

export default QuestionCard