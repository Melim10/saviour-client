import { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProfileForm from "../components/EditProfileForm";
import { AuthContext } from "../Context/auth.context";

  const UserProfilePage = () => {
  const { userId } = useParams();
  const [editableUser, setEditableUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const {user} = useContext(AuthContext);


  const API_URL = `http://localhost:5005/api/users/${userId}`;




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
  }, []);

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
    <div className="margin-div">
      {!loading ? (
        <div>
          <h1>{editableUser.name}</h1>
          <img src={editableUser.picture}></img>
          <p>Email: {editableUser.email}</p>
          Skills:
          <ul>
                  {skills.map((skill, index) => (
                    <li key={index}>
                      <p className="skill-label">{skill}</p>
                      {edit &&
                      <button onClick={() => handleRemoveSkill(skill)}>
                        Remove
                      </button>}
                    </li>
                  ))}
          </ul>
          {!edit && canEdit && (
            <button
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit Profile
            </button>
          )}
          {edit && <EditProfileForm defaultSkills={skills} defaultPicture={user.picture}/>}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
export default UserProfilePage;