import React, { useState, useEffect } from "react";
const API_URL = "http://localhost:5005"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import skillsList from '../assets/skillList.json'
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

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
            navigate("/")
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
      <div>
          {skillsList.map((skill)=>{
                  return( 
                      skill !== "none" &&
                      <div key={skill} style={{display: "flex"}}>
                          <label style={{display:`${!defaultSkills.includes(skill)?"block":"none"}`}} >{skill} </label>
                          <input type="checkbox" value={skill} onChange={(e)=>handleCheckBox(e.target.value)} style={{display:`${!defaultSkills.includes(skill)?"block":"none"}`}}></input>
                      </div>
                  )
              })}
      </div>

        <div>
        <label>Profile Picture</label>
        <input type="text" name="picture" value={picture} onChange={(e)=>{setPicture(e.target.value)}} />
        <label>Current Title</label>
        <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        </div>

        <div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
