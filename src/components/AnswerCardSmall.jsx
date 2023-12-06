import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';

const AnswerCardSmall = (props) =>{

    const{answer} = props;

    const navigate = useNavigate();

    const goToDetails = (x) => {
        navigate(`/questions/${x}`)
    }



    return(<Card onClick={()=>goToDetails(answer.question._id)} className="answer-card">
            <div className="card-header">
                <Typography>{answer.title}</Typography>
                <h4>Posted by: {answer.question.postedBy}</h4>
                <p className="small-text">{answer.when}</p>
            </div>
            <div className="card-content">
                <h3>{answer.question.title}</h3>
            </div>
            <p className="card-description">{answer.description}</p>
        </Card>)

}

export default AnswerCardSmall;
