import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";
import { useNavigate } from "react-router-dom";

/* const questionSchema = new Schema({
    postedBy: { type: String, required: true },
    title: { type: String, required: true},
    description: { type: String },
    skills: [],
    answers: [],
  });
 */
  const NewQuestion = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {user, isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const postedBy=user.name;

    const API_URL = "http://localhost:5005/api/questions"


    const handleSubmit=(e)=>{
        const requestBody = {postedBy, title, description}
        e.preventDefault();

        console.log("clicked")
        axios.post(API_URL, requestBody)
        .then(()=>{
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} maxLength={30}/>
                <input type="text" name="description" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    <label>
                        <input type="radio" name="options" value="option1" /> Option 1
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="options" value="option2" /> Option 2
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="options" value="option3" /> Option 3
                    </label>
                    <button type="submit">Go!</button>
                </form>
        </div>
    )
  }

  export default NewQuestion;