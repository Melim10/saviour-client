import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth.context";

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
    const {user} = useContext(AuthContext);
    console.log(user.name)

    const API_URL = "http://localhost:5005/api/questions"


    const handleSubmit=(e)=>{
        e.prevent.default();
        const requestBody = {title, description}
        console.log =(requestBody)

        axios.post(API_URL, requestBody)
        .then(()=>{
            alert("Thank You!")
            navigate('/homepage')
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
                </form>
                <button type="submit">Go!</button>
        </div>
    )
  }

  export default NewQuestion;