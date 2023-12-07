import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCardSmall from "../components/UserCardSmall";
import { Typography } from "@mui/material";


export default function RankingPage() {
  const API_URL = "https://saviour.adaptable.app/api/users";
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(API_URL).then((response) => {
        const sortedUsers = response.data.sort((a, b) => b.correctAnswers - a.correctAnswers);
      setUsers(sortedUsers)
    });
  }, []);
  console.log(users);

  return (
    <div className="rank-list">
      <Typography gutterBottom variant="h4" component="div">
          Members:
      </Typography>
      <ul>
      {users.map((user, id) => {
        return (
            <div key={id}>
            <UserCardSmall user={user}/>
            </div>
        );
      })}
      </ul>
    </div>
  );
}
