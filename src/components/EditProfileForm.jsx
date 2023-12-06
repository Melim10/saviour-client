import React, { useState, useEffect } from "react";
const API_URL = "https://saviour.adaptable.app"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import skillsList from '../assets/skillList.json'
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";
import { Button } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


export default function EditProfileForm(props) {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const {userId} = useParams();
    const [picture, setPicture] = useState(``);
    const [title, setTitle] = useState('')
    const {defaultSkills, defaultPicture, defaultJobTitle} = props;
    let skillsToPush =[];

    console.log("PICTURE", defaultPicture)
    console.log("Title", defaultJobTitle)

    useEffect(()=>{
      setPicture(defaultPicture);
      setTitle(defaultJobTitle);
    },[])

    

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const requestBody = { jobTitle: title || defaultJobTitle, skills: skillsToPush, picture: picture || "https://cdn1.iconfinder.com/data/icons/user-interface-664/24/User-512.png"};

        axios.put(`${API_URL}/api/users/${userId}`, requestBody)
        .then(()=>{
            navigate("/homepage")
        })
        .catch((error)=>{
            const errorDescription = error.response.data.message;
            setError(errorDescription);
        })
    }

    const handleCheckBox = (e) =>{
      if(skillsToPush.includes(e)){
          const indexToRemove = skillsToPush.indexOf(e);
          skillsToPush.splice(indexToRemove,1);
      }
      else if (!defaultSkills.includes(e)){
        skillsToPush.push(e)
      }
  }

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
      <div className="profile-skills-map">
      {skillsList.map((skill) => {
        return (
          skill !== 'none' && (
            <div key={skill} style={{ display: 'flex' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={skillsToPush.includes(skill)}
                    onChange={() => handleCheckBox(skill)}
                    value={skill}
                    style={{ display: !defaultSkills.includes(skill) ? 'block' : 'none' }}
                  />
                }
                label={skill}
                style={{ display: !defaultSkills.includes(skill) ? 'block' : 'none' }}
              />
            </div>
          )
        );
      })}
      </div>

      <div>
      <TextField
        label="Profile Picture"
        type="text"
        name="picture"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Current Title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
    </div>
        <div>
        <Button variant="contained" size="small" onClick={handleEditSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
