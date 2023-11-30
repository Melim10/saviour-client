import { useState, useContext, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    axios.get(`${API_URL}/api/users/${user._id}`).then((response) => {
      console.log(response.data.skills);
      setSkills(response.data.skills);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    const requestBody = { postedBy, title, description };
    e.preventDefault();

    console.log("clicked");
    axios
      .post(`${API_URL}/api/questions`, requestBody)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {!loading ? (
        <div className="margin-div">
          <form className="question-form" onSubmit={handleSubmit}>
            <div className="question-form-title">
              <input
                placeholder="Question Title"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={35}
                style={{ width: "20vw" }}
              />
              <p>{title.length}/35</p>
            </div>
            <div className="question-form-description">
              <input
                placeholder="Your question description..."
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "60vw", height: "20vh" }}
                maxLength={500}
              />
              <p>{description.length}/500</p>
            </div>
            <div className="question-form-select">
              <p>Skill's Tags</p>
              {skills.map((skill) => {
                return (
                  <div>
                    {skill}
                  </div>
                );
              })}
            </div>
            <button style={{ width: "200px" }}>Sumbit Question</button>
          </form>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default NewQuestion;
