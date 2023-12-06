import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';

const QuestionCardSmall = (props) =>{

    const{question} = props;

    const navigate = useNavigate();

    const goToDetails = (x) => {
        navigate(`/questions/${x}`)
    }



    return(
        <Card variant="outlined"onClick={()=>goToDetails(question._id)} className="question-card">
            <CardContent>
            <div className="card-header">
            <div className="card-title-div">
            <Typography gutterBottom variant="h5" component="div">
                {question.title}
                <img className="non-clickable" src={question.solved?'/solved.png':'/notSolved.png'}></img>
                <div className="skill-list">
                {question.skills.length === 0 ? <p>No specific context</p> :
                question.skills.map((skills, index)=>{
                    return (
                        skills !== "none" ? <Typography className="skill-label" variant="body2" color="text.secondary" key={index}>{skills}</Typography> : null
                      );
                })}
            </div>
            </Typography>
            </div>
            <div className="card-postedby">
            <Typography gutterBottom variant="h7" component="div">
                Posted by: {question.postedBy}
            </Typography>
            <Typography gutterBottom variant="h8" component="div">
                {question.when}
            </Typography>
            </div>
            </div>

            <Typography className="card-description" variant="body2" color="text.primary">
            {question.description}
            </Typography>
            </CardContent>
  
        </Card>)

}

export default QuestionCardSmall;
