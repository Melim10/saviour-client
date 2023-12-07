import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card'

const UserCardSmall = (props) =>{

    const{user} = props;

    const navigate = useNavigate();

    const goToDetails = (x) => {
        navigate(`/users/${x}`)
    }



    return(<Card variant="outlined" className="rank-card" onClick={()=>goToDetails(user._id)}>
            <div className="card-header">
                <Avatar
            style={{border: "1px solid black"}}
            alt="Remy Sharp"
            src={user.picture}
            sx={{ width: 50, height: 50 }}
          />
                <div style={{display: "flex", flexDirection:"column"}}>
                <h3>{user.name}</h3>
                <p>{user.jobTitle}</p>
                </div>
                <div>
                <h3>{user.correctAnswers}</h3>
                <img className='non-clickable' src='/cool.png'></img>
                </div>
            </div>
        </Card>)

}

export default UserCardSmall;
