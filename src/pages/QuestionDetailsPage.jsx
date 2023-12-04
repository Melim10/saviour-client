import { useContext, useEffect, useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";
import dateGenerator from "../utils/dateGenerator";
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
        navigate('/')
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
            navigate('/')
        )
        .catch((error) => console.log(error))
    }

    const handleDelete = () =>{
        axios.delete(API_URL)
        .then(navigate('/'))
    }

    return(<div>
        {!loading ?  (
        <div  className="margin-div card-list">
            <div className="card-header">
                <div>
                    <h2>{question.title}</h2>
                    <img src={question.solved?'/solved.png':'/notSolved.png'}/>
                </div>
                {canEdit?
                <div className="clickable-list">
                    <img className="clickable" onClick={editQuestion}src={'/edit.png'}></img>
                    <img className="clickable" onClick={handleSolved}src={'/check.png'}></img>
                    <img className="clickable" onClick={handleDelete}src={'/bin.png'}></img>
            </div>
            :
            ""
            }
            </div>
            <p onClick={()=>{navigate(`/users/${question.userId}`)}}>Posted by:<span  className="link-to-profile">{question.postedBy}</span></p>
            <div className="skill-list">
            <p>Context: </p>
            {question.skills.length === 0 ? <p>No specific context</p> :
            question.skills.map((skills)=>{
                return(
                    <p className="skill-label">{skills}</p>
                )
            })}
           </div>
           <hr className="hr"></hr>
            <p>{question.description}</p>
           <div className="answers-div">
            <h3>Answers:</h3>
            {question.answers && question.answers.map((answer)=>{
                return(
                    <div className="answer-card">
                    <div className="answer-card-header">
                        <h4 onClick={()=>{navigate(`/users/${answer.postedBy._id}`)}}>Posted By: <span className="link-to-profile">{answer.postedBy.name}</span></h4>
                        <img className={canEdit? "clickable" : "non-clickable"} src={question.cool ? '/cool.png' : '/notCool.png'}/>
                    </div>
                    <p className="small-text">{answer.when}</p>
                    <p>{answer.description}</p>
                    </div>
                )
            })}
            {isLoggedIn &&(
            <form id="answer-form" style={{display: posting? "block" : "none", width:"60vw", height:"20vh"}} >
                <input type="text" style={{width:"800px", height:"200px"}} value={answer} onChange={(e)=> setAnswer(e.target.value)} maxLength={500}></input>
                <div style={{display:"flex"}}>
                <p>{answer.length}/500</p>
                <button id="post-answer-button" onClick={handleClick}>Post</button>
                </div>
            </form>)}
            {isLoggedIn && <button style={{display: posting? "none" : "block"}} id="new-answer-button" onClick={handleClick}>New Answer</button>}
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
        <h1 className="margin-div">loading</h1>)}
    </div>)

}

export default QuestionDetailsPage;