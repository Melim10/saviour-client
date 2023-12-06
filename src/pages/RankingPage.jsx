import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCardSmall from "../components/UserCardSmall";

export default function RankingPage() {
  const API_URL = "http://localhost:5005/api/users";
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(API_URL).then((response) => {
        const sortedUsers = response.data.sort((a, b) => b.correctAnswers - a.correctAnswers);
      setUsers(sortedUsers)
    });
  }, []);
  console.log(users);

  return (
    <div className="card-list">
      <h1>Ranking</h1>
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
