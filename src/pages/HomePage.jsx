import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";


function HomePage() {

  const API_URL = "http://localhost:5005/api/questions";
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const {user, isLoggedIn} = useContext(AuthContext)
  console.log(user)

  !isLoggedIn && navigate('/')



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
          <Typography gutterBottom variant="h2" component="div">
            Recent Questions
          </Typography>
          <Button variant="contained"className="new-question-button"
          onClick={makeNewQuestion}>Ask a question!</Button>
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