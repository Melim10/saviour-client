import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProfileForm from "../components/EditProfileForm";
const UserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const API_URL = `http://localhost:5005/api/users/${userId}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
        console.log(response.data.skills)
        setSkills(response.data.skills)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    <div className="margin-div">
      {!loading ? (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture}></img>
          <p>{user.email}</p>
          Skills:
          <ul>
                  {skills.map((skill, index) => (
                    <li key={index}>
                      {skill}
                      {edit &&
                      <button onClick={() => handleRemoveSkill(skill)}>
                        Remove
                      </button>}
                    </li>
                  ))}
          </ul>
          {!edit && (
            <button
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </button>
          )}
          {edit && <EditProfileForm defaultSkills={skills}/>}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
export default UserProfilePage;