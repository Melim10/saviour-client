import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import NavBar from "../components/NavBar";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate } from "react-router-dom";

function MyQuestions() {

  const API_URL = "http://localhost:5005/api/questions";
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    axios.get(API_URL)
    .then((response) =>{
      setQuestions(response.data);
    })  
  },[])

  const makeNewQuestion = () =>{
    navigate('/')
  }

  console.log(user.name)


  return (
    <div className="card-list">
          <h1>My Questions</h1>
          <button className="new-question-button" onClick={makeNewQuestion}
          >New question!</button>
          {questions
            .filter((question) => question.postedBy === `${user.name}`)
            .map((question, id) => {
            return(
              <div key={id}>
                <QuestionCardSmall question={question} />
              </div>
              )
            })}
    </div>
  );
}

export default MyQuestions;

