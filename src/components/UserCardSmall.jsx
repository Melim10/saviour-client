import { useNavigate } from "react-router-dom";
const UserCardSmall = (props) =>{

    const{user} = props;

    const navigate = useNavigate();

    const goToDetails = (x) => {
        navigate(`/users/${x}`)
    }



    return(<div onClick={()=>goToDetails(user._id)} className="question-card">
            <div className="card-header">
                <h3>{user.name}</h3>
            <img src={user.picture} alt="" />
            </div>
            <div className="card-content">
            </div>
            <div className="skill-list">
                {user.skills.length === 0 ? <p>No specific skills</p> :
                user.skills.map((skills, index)=>{
                    return (
                        skills !== "none" ? <p key={index} className="skill-label">{skills}</p> : null
                      );
                })}
            </div>
        </div>)

}

export default UserCardSmall;
