import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";
import { Link } from "react-router-dom";

const NavBar = () => { 
    const { isLoggedIn, user, logOut } = useContext(AuthContext);
    
return(
    <div>
    {isLoggedIn && (
        <nav>
            <h1>
                Saviour!
            </h1>
            <div className="nav-buttons">
                <ul>
                    <li><Link to={`/users/${user._id}`}>{user.name}</Link></li>
                    <li><Link to="/">AllQuestions</Link></li>
                    <li><Link to="/my-questions">MyQuestions</Link></li>
                </ul>
                <button onClick={logOut}>Logout</button>
            </div>
        </nav>
        )}
    </div>
    )    
}

export default NavBar;
