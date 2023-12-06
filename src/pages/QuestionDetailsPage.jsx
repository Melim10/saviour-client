import { useContext, useEffect, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import dateGenerator from "../utils/dateGenerator";
import EditQuestionForm from "../components/EditQuestionForm";
import { Button, Card } from "@mui/material";
import Typography from '@mui/material/Typography';

const QuestionDetailsPage = () =>{
    const {questionId} = useParams();
    const API_URL = `http://localhost:5005/api/questions/${questionId}`
    const {user, isLoggedIn} = useContext(AuthContext);
    const [question,setQuestion] = useState({});
    const [posting, setPosting] = useState(false);
    const [answer,setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);
    const [defaultSkill1, setDefaultSkill1] = useState("");
    const [defaultSkill2, setDefaultSkill2] = useState("");
    const [skills, setSkills] = useState({});
    const [edit,setEdit] = useState(false)
    const [solved, setSolved] = useState(question.solved);

    const navigate = useNavigate();

    

    useEffect(() => {
        axios
          .get(API_URL)
          .then((response) => {
            setQuestion(response.data);
            setLoading(false);
            setSkills(response.data.skills)
          })
          .catch((error) => console.log(error));
      }, [solved]);

      useEffect(()=>{
        (isLoggedIn &&
        checkIfCanEdit());
        skills[0]&& setDefaultSkill1(skills[0]);
        skills[1]? setDefaultSkill2(skills[1]) : skills[1]&& setDefaultSkill2("None");
      },[question,])


    const handleClick = () => {

        if(!posting){
        setPosting(true)
        }
        else{
        const requestBody = {
            "postedBy": user._id,
            "when": dateGenerator(),
            "description": answer,
            "cool": false}
        
        requestBody.description &&(
        axios.post(`${API_URL}/addAnswer`, requestBody))
        .then(console.log(requestBody))
        setAnswer("")
        setPosting(false)
        navigate('/homepage')
        }
    }

    const checkIfCanEdit = () =>{
        if(question.userId === user._id){
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

    const handleSolved = () =>{
        setSolved(!question.solved);
        const requestBody = {
            postedBy: question.postedBy,
            title: question.title,
            skills: question.skills,
            description: question.description,
            solved: !question.solved
        }

        axios.put(API_URL, requestBody)
        .then(
            navigate('/my-questions')
        )
        .catch((error) => console.log(error))
    }

    const handleDelete = () =>{
        axios.delete(API_URL)
        .then(navigate('/my-questions'))
    }

    return(<div className="card-list">
        {!loading ?  (
        <div  className="question-details-question">
            <Card>
            <div  style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                <div>
                    <Typography gutterBottom variant="h3" component="div">
                    {question.title}
                    <img className="solved-icon" src={question.solved?'/solved.png':'/notSolved.png'}/>
                    {canEdit && <img className="clickable" onClick={handleSolved}src={'/check.png'}></img>}
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="h7" component="div" onClick={()=>{navigate(`/users/${question.userId}`)}}>
                        Posted by:<span  className="link-to-profile">{question.postedBy}</span>
                    </Typography>
                    <Typography gutterBottom variant="h8" component="div">
                        {question.when}
                    </Typography>
                </div>
            </div>


        <div >
            <Typography>
                    
                    {canEdit?
                <div className="clickable-list">
            </div>
            :
            ""
            }
                </Typography>
                {canEdit?
                <div className="clickable-list">
                    <img className="clickable" onClick={editQuestion}src={'/edit.png'}></img>
                    <img className="clickable" onClick={handleDelete}src={'/bin.png'}></img>
            </div>
            :
            ""
            }
            </div>
            
            <div>
       

            <div className="skill-list">
            <p>Context: </p>
            {question.skills.length === 0 ? <p>No specific context</p> :
            question.skills.map((skills)=>{
                return(
                    <p className="skill-label">{skills}</p>
                )
            })}
           </div>
           <Typography gutterBottom variant="h5" component="div" className="question-details-description">
            {question.description}
            </Typography>
            </div>
            </Card>
           <div className="answers-div">
            
           <Typography gutterBottom variant="h6" component="div" className="card-header">Answers:</Typography>
            {question.answers && question.answers.map((answer)=>{
                return(
                    <Card variant="outlined" className="answer-card">
                    <div className="answer-card-header">
                        <Typography  onClick={()=>{navigate(`/users/${answer.postedBy._id}`)}}>
                            Posted By: <span className="link-to-profile">{answer.postedBy.name}</span>
                        </Typography >
                        <div style={{display:"flex", alignItems:"center"}}>
                            <p className="small-text">{answer.when}</p>
                            <img className={canEdit? "clickable" : "non-clickable"} src={question.cool ? '/cool.png' : '/notCool.png'}/>
                        </div>
                    </div>
                    <p>{answer.description}</p>
                    </Card>
                )
            })}
            {isLoggedIn &&(
            <form id="answer-form" style={{display: posting? "block" : "none", width:"60vw", height:"20vh"}} >
                <input type="text" style={{width:"800px", height:"200px"}} value={answer} onChange={(e)=> setAnswer(e.target.value)} maxLength={500}></input>
                <div style={{display:"flex", alignItems:"center"}}>
                <p>{answer.length}/500</p>
                <Button variant="outlined" id="post-answer-button" style={{padding:"0px"}}onClick={handleClick}>Post</Button>
                </div>
            </form>)}
            <Button variant="contained" style={{display: posting? "none" : "block"}} id="new-answer-button" onClick={handleClick}>New Answer</Button>
            </div>
            {edit && 
            <EditQuestionForm 
            questionId={questionId} 
            postedBy={question.postedBy} 
            defaultTitle={question.title} 
            defaultDescription={question.description} 
            defaultSolved={question.solved}
            defaultSkill1={defaultSkill1}
            defaultSkill2={defaultSkill2}
            edit={edit}
            />}
        </div>
        )
        :(
        <div className="loading-gif margin-div"> 
            <img src="/loading.gif"/>
        </div>
        )}
    </div>)

}



export default QuestionDetailsPage;