import { useNavigate } from "react-router-dom";
const QuestionCardSmall = (props) =>{

    const{question} = props;

    const navigate = useNavigate();

    const goToDetails = (x) => {
        navigate(`/questions/${x}`)
    }



    return(<div onClick={()=>goToDetails(question._id)} className="question-card">
            <div className="card-header">
                <h3>{question.title}</h3>
                <img className="solved-icon" src={question.solved?'/solved.png':'/notSolved.png'}></img>
            </div>
            <div className="card-content">
                <h4>Posted by: {question.postedBy}</h4>
                <p className="small-text">{question.when}</p>
            </div>
            <div className="skill-list">
                {question.skills.length === 0 ? <p>No specific context</p> :
                question.skills.map((skills, index)=>{
                    return (
                        skills !== "none" ? <p key={index} className="skill-label">{skills}</p> : null
                      );
                })}
            </div>
            <p className="card-description">{question.description}</p>
        </div>)

}

export default QuestionCardSmall;
