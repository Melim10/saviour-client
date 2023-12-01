import React, { useState } from "react";
const API_URL = "http://localhost:5005"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProfileForm() {
    const navigate = useNavigate()
    const {userId} = useParams();
    const [skills, setSkills] = useState("")
    const [picture, setPicture] = useState("")

    const handleEditSubmit = (e) => {
        // Prevent default actions of the form submission e.g.: refreshing the page
        e.preventDefault();

        // Create a request body object
        const requestBody = { skills, picture};

        axios.put(`${API_URL}/api/users/${userId}`, requestBody)
        .then(()=>{
            navigate("/")
        })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                setError(errorDescription);
            })
    }
  return (
    <div>
      <form onSubmit={handleEditSubmit}>

        <div>
        <label>Skills</label>
        <input type="text" name="skills" value={skills} onChange={(e)=>{setSkills(e.target.value)}} />
        </div>

        <div>
        <label>Profile Picture</label>
        <input type="text" name="picture" value={picture} onChange={(e)=>{setPicture(e.target.value)}} />
        </div>

        <div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
