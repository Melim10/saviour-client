import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfilePage = () =>{
    const{userId} = useParams();
    const [user,setUser] = useState({});

    const API_URL = `http://localhost:5005/api/users/${userId}`


    useEffect(()=>{
       axios.get(API_URL)
       .then((response)=>{
        setUser(response.data)
       })
       .catch((error)=>{
        console.error(error)
       })
    },[])

    return(<div className="margin-div">
        <h1>{user.name}</h1>
        <img src={user.picture}></img>
        <p>{user.email}</p>
    </div>)

}

export default UserProfilePage;