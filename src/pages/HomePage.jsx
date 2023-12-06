import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

function HomePage() {

  const API_URL = "http://localhost:5005/api/questions";
  const [questions, setQuestions] = useState([]);
  const sortedQuestions = questions.sort((a, b) => {
    const dateA = new Date(a.when);
    const dateB = new Date(b.when);
  
    return dateB - dateA;
  });
  
  console.log("This is the sorted questions:",sortedQuestions);

  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  console.log(user, questions)



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
          {sortedQuestions.map((question, id)=>{
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