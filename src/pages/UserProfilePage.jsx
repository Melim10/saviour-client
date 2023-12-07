import { useEffect, useState, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditProfileForm from "../components/EditProfileForm";
import { AuthContext } from "../Context/auth.context";
import AnswerCardSmall from "../components/AnswerCardSmall";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

  const UserProfilePage = () => {
  const { userId } = useParams();
  const [editableUser, setEditableUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const {user, isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();


  const API_URL = `https://saviour.adaptable.app/api/users/${userId}`;
  !isLoggedIn && navigate('/')

  console.log(editableUser)

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setEditableUser(response.data);
        setLoading(false);
        setSkills(response.data.skills)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  useEffect(()=>{
    checkIfCanEdit()
  },[user])

  const checkIfCanEdit = () =>{
    if(user._id == userId){
        setCanEdit(true)
        console.log("User Can Edit")
    }
    else{
        console.log(user.name,"Not the original poster, original is")
    }
}

  const handleRemoveSkill = (skillToRemove) => {
    const requestBody = {skill: skillToRemove }
    axios.put(`${API_URL}/skills`, requestBody)
    .then((response)=>{
      setSkills(response.data.skills);
    })
    .catch ((error) =>{
      console.error('Error removing skill:', error);
    })
  };


  return (
    <div>
      {!loading ?(
      <div className="profile-container ">
        <Card sx={{}} className="profile-info same-height">
          <Avatar
            alt="Remy Sharp"
            src={editableUser.picture}
            sx={{ width: 200, height: 200 }}
            className="profile-info-picture"
          />
          <Typography gutterBottom variant="h5" component="div">
            {editableUser.name}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {editableUser.jobTitle}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Email: {editableUser.email}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Skills:
          </Typography>
          <Typography variant="body2" color="text.primary">
          <ul className="skill-to-delete profile-skills-map">
                  {skills.map((skill, index) => (
                    <li key={index}>
                      <p className="skill-label">{skill}</p>
                      {edit &&
                      <img src='/bin.png' className="clickable" onClick={() => handleRemoveSkill(skill)}/>}
                    </li>
                  ))}
          </ul>
          </Typography>
          {!edit && canEdit && (
            <Button variant="outlined"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </Button>
          )}
          {edit && <EditProfileForm defaultSkills={editableUser.skills} defaultPicture={editableUser.picture} defaultJobTitle={editableUser.jobTitle}/>}
        </Card>
        <div className="card-list same-height">
          <Typography gutterBottom variant="h3" component="div">
            {editableUser.name}'s Answers
          </Typography>
              {editableUser.answers.map((answer)=>{
                return(<AnswerCardSmall answer={answer}/>)
              })}
        </div>
        </div>
      ):(
        <div className="loading-gif margin-div"> 
        <img src="/loading.gif"/>
    </div>)}
    </div>
  );
};
export default UserProfilePage;