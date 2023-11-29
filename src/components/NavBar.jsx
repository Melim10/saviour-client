import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

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
                    <li><a>{user.name}</a></li>
                    <li><a>Questions</a></li>
                </ul>
                <button onClick={logOut}>Logout</button>
            </div>
        </nav>
        )}
    </div>
    )    
}

export default NavBar;
