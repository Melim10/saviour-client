import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";


function MyQuestions() {

  const API_URL = "https://saviour.adaptable.app/api/questions";
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  !isLoggedIn && navigate('/')
  useEffect(()=>{
    axios.get(API_URL)
    .then((response) =>{
      setQuestions(response.data);
      setLoading(false);
    })  
  },[])

  const makeNewQuestion = () =>{
    navigate('/new-question')
  }


  return (
    <div>
    <div className="card-list">
          <Typography gutterBottom variant="h2" component="div">
            My Questions
          </Typography>
          <Button variant="contained"className="new-question-button"
          onClick={makeNewQuestion}>Ask a question!</Button>
          {!loading ? (questions
            .filter((question) => question.postedBy === `${user.name}`)
            .map((question, id) => {
            return(
              <div key={id}>
                <QuestionCardSmall question={question} />
              </div>
              )
            })) :(
              <div className="loading-gif margin-div"> 
                  <img src="/loading.gif"/>
              </div>
            )}
    </div>
  </div>
  );
}

export default MyQuestions;

