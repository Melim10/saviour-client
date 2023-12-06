import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';

const AnswerCardSmall = (props) =>{

    const{answer} = props;
    console.log(answer);

    const navigate = useNavigate();


    return(<Card className="profile-answer-card" variant="outlined"  onClick={() => navigate(`/questions/${answer.question._id}`)}>
            <div>
                <Typography>{answer.description}</Typography>
                <div style={{textAlign: "right"}}>
                    <Typography variant="body2">
                        on:{answer.question.title}
                    </Typography>
                    <Typography variant="body2">
                        by:{answer.question.postedBy}
                    </Typography>
                </div>
            </div>

        </Card>)

}

export default AnswerCardSmall;
