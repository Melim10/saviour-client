import { useNavigate } from "react-router-dom";
const QuestionCardSmall = (props) =>{

    const{question} = props;

    const navigate = useNavigate();

    const goToDetails = (x) => {
        navigate(`/questions/${x}`)
    }

    return(<div onClick={()=>goToDetails(question._id)} className="question-card">
            <h3>{question.title}</h3>
            <h4>Posted by: {question.postedBy}</h4>
            <div className="skill-list">
            {question.skills.map((skills)=>{
                return(
                    <p>{skills}</p>
                )
            })}
            </div>
            <p>{question.details}</p>
        </div>)

}

export default QuestionCardSmall;