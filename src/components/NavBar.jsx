import { useContext, useState } from "react";
import { AuthContext } from "../Context/auth.context";
import { Link } from "react-router-dom";

const NavBar = () => { 
    const { isLoggedIn, user, logOut} = useContext(AuthContext);
    const [isHidden, setIsHidden] = useState(true)

const toggleMenu = () => {
    setIsHidden(!isHidden)
}
    
return(
    <div>
    {isLoggedIn && (
        <nav>
            <Link to={`/`}><h1>Saviour!</h1></Link>
            <div className="nav-buttons">
                <img className="clickable" src="/menu.png"
                onClick={toggleMenu}/>
                <ul id="hidden-list" className={isHidden?"hidden":"not-hidden"}>
                    <li><Link to={`/users/${user._id}`} onClick={toggleMenu}>{user.name}</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>All Questions</Link></li>
                    <li><Link to="/my-questions" onClick={toggleMenu}>My Questions</Link></li>
                    <li><Link to="/" onClick={logOut} >Logout</Link></li>
                </ul>
            </div>
        </nav>  
        )}
            {!isLoggedIn && (
        <nav>
            <h1>
                Saviour!
            </h1>
            <div className="nav-buttons">
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </div>
        </nav>
        )}
    </div>
    )    
}

export default NavBar;
