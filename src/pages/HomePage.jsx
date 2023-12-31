import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCardSmall from "../components/QuestionCardSmall";
import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";


function HomePage() {

  const API_URL = "https://saviour.adaptable.app/api/questions";
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user, isLoggedIn} = useContext(AuthContext)
  console.log(user, questions)


  const sortedQuestions = questions.sort((a, b) => {
    const dateA = new Date(a.when);
    const dateB = new Date(b.when);
    return dateB - dateA;
  });

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

    <div className="card-list">
          <Typography gutterBottom variant="h2" component="div">
            Recent Questions
          </Typography>
          <Button variant="contained"className="new-question-button"
          onClick={makeNewQuestion}>Ask a question!</Button>
          {!loading?(
                      sortedQuestions.map((question, id)=>{
                        return(
                          <div key={id}>
                              <QuestionCardSmall question={question}/>
                          </div>
                      )
                      })
          ):(
            <div className="loading-gif margin-div"> 
                <img src="/loading.gif"/>
            </div>
          )}
    </div>
  );
}

export default HomePage;