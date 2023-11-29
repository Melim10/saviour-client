import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import NavBar from "../components/NavBar";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate } from "react-router-dom";

function HomePage() {

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

  const goToLogin = (x) => {
    navigate('/login')
  }

  const goToSignup = () => {
    navigate('/signup')
  }

  const makeNewQuestion = () =>{
    navigate('/new-question')
  }



  return (
    <div>
      {isLoggedIn ? (
        <div>
          <NavBar/>
          <h1>Recent Questions</h1>
          {questions.map((question, id)=>{
            return(
              <div key={id}>
                  <QuestionCardSmall question={question}/>
              </div>
          )
          })}
    <button onClick={makeNewQuestion}>Make your question!</button>
    



















        </div>) : (
        <div>
          <h1>Welcome to Saviour !</h1> 
          <button onClick={goToLogin}>Login</button>
          <button onClick={goToSignup}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;