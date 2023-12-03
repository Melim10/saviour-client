import { useContext, useEffect, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import NavBar from "../components/NavBar";
import dateGenerator from "../components/dateGenerator";
import EditQuestionForm from "../components/EditQuestionForm";




const QuestionDetailsPage = () =>{
    const {questionId} = useParams();
    const API_URL = `http://localhost:5005/api/questions/${questionId}`
    const {user, isLoggedIn} = useContext(AuthContext);
    const [question,setQuestion] = useState({});
    const [posting, setPosting] = useState(false);
    const [answer,setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);
    const [edit,setEdit] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        axios
          .get(API_URL)
          .then((response) => {
            setQuestion(response.data);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }, []);

      useEffect(()=>{
        (isLoggedIn &&
        checkIfCanEdit());
      },[question,])


    const handleClick = () => {
        const form = document.getElementById('answer-form')
        const newButton = document.getElementById('new-answer-button')

        if(!posting){
        setPosting(true)
        form.style.display = "block"
        newButton.style.display="none"
        }
        else{
        const requestBody = {
            "postedBy": user.name,
            "when": dateGenerator(),
            "description": answer}  
        
        requestBody.description &&(
        axios.put(`${API_URL}/answers`, requestBody))
        form.style.display = "none"
        setAnswer("")
        setPosting(false)
        navigate('/')
        }
    }

    const checkIfCanEdit = () =>{
        if(question.postedBy === user.name){
            setCanEdit(true)
            console.log("User Can Edit")
        }
        else{
            console.log(user.name," Not the original poster, original is", question.postedBy)
        }
    }

    const editQuestion = () =>{
        setEdit(!edit)
    }



    return(<div>
        <NavBar/>
        {!loading ? (
        <div  className="margin-div question-details-div card-list">
            <div className="card-header">
            <h2>{question.title}</h2>
            <div className="card-header-icons-div">
            <img src={question.solved?'/solved.png':'/notSolved.png'}/>
            {canEdit?
            <img className="clickable" onClick={editQuestion}src={'/edit.png'}></img>
            :
            ""
            }
            </div>
            </div>
            <p>Posted by: {question.postedBy}</p>
            <div className="skill-list">
            <p>Context: </p>
            {question.skills.length === 0 ? <p>No specific context</p> :
            question.skills.map((skills)=>{
                return(
                    <p>{skills}</p>
                )
            })}
           </div>
           <hr className="hr"></hr>
            <p>{question.description}</p>
           <div className="answers-div">
            <h4>Answers:</h4>
            {question.answers.map((answer)=>{
                return(
                    <div className="answer-card">
                    <h3>Posted By: {answer.postedBy}</h3>
                    <p className="small-text">{answer.when}</p>
                    <p>{answer.description}</p>
                    </div>
                )
            })}
            {isLoggedIn &&(
            <form id="answer-form" style={{display: "none", width:"60vw", height:"20vh"}} >
                <input type="text" style={{width:"800px", height:"200px"}} value={answer} onChange={(e)=> setAnswer(e.target.value)} maxLength={500}></input>
                <div style={{display:"flex"}}>
                <p>{answer.length}/500</p>
                <button id="post-answer-button" onClick={handleClick}>Post</button>
                </div>
            </form>)}
            {isLoggedIn && <button id="new-answer-button" onClick={handleClick}>New Answer</button>}
            </div>
            {edit && 
            <EditQuestionForm 
            questionId={questionId} 
            postedBy={question.postedBy} 
            defaultTitle={question.title} 
            defaultDescription={question.description} 
            defaultSolved={question.solved}
            />}
        </div>
        )
        :(
        <h1 className="margin-div">loading</h1>)}
    </div>)

}

export default QuestionDetailsPage;