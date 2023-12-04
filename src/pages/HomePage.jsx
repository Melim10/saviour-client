import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

function HomePage() {

  const API_URL = "http://localhost:5005/api/questions";
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  console.log(user)


  useEffect(()=>{
    axios.get(API_URL)
    .then((response) =>{
      setQuestions(response.data);
    })  
  },[])

  const makeNewQuestion = () =>{
    navigate('/new-question')
  }


  return (

    <div className="card-list">
          <h1>Recent Questions</h1>
          <button className="new-question-button"
          onClick={makeNewQuestion}>New question!</button>
          {questions.map((question, id)=>{
            return(
              <div key={id}>
                  <QuestionCardSmall question={question}/>
              </div>
          )
          })}
    </div>
  );
}

export default HomePage;