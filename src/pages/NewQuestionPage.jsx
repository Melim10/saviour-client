import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";
import skillsList from '../assets/skillList.json'
import dateGenerator from "../utils/dateGenerator";
import TextField from '@mui/material/TextField';
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "@mui/material";
import Typography from '@mui/material/Typography';


  const NewQuestion = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user} = useContext(AuthContext);
    const [skill1, setSkill1] = useState('none');
    const [skill2, setSkill2] = useState('none');
    const skills =[skill1, skill2];
    const navigate = useNavigate();
    const date = dateGenerator();

    const API_URL = "https://saviour.adaptable.app/";



    const handleSubmit=(e)=>{
        const requestBody = {postedBy: user.name, title, description, skills: skills, when: date, userId: user._id}
        e.preventDefault();
        console.log("NEW ANSWER:")
        console.log(requestBody)

        axios.post(`${API_URL}/api/questions`, requestBody)
        .then(()=>{
            navigate('/my-questions')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className="new-question-div">
            <Typography gutterBottom variant="h2" component="div">
                Ask a question
          </Typography>
      <form className="question-form" onSubmit={handleSubmit}>
        <div className="question-form-title">
          <TextField
            label="Question Title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 35 }}
            style={{ width: '20vw' }}
          />
          <p>{title.length}/35</p>
        </div>
        <div className="question-form-description">
          <TextField
            label="Your question description..."
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 500 }}
            style={{ width: '60vw', height: '20vh' }}
            multiline
          />
          <p>{description.length}/500</p>
        </div>
        <div className="question-form-select">
          <p>Skill's Tags</p>
          <Select value={skill1} onChange={(e) => setSkill1(e.target.value)}>
            {skillsList.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
          <Select value={skill2} onChange={(e) => setSkill2(e.target.value)}>
            {skillsList.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" style={{ width: '200px' }} type="submit">
            Submit Question
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewQuestion;
