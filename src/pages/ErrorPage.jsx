import {useNavigate} from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    return(<div>
        <h1>Someting went Wrong!</h1>
        <button onClick={goToHome}>SaveMe!</button>

    </div>)

}

export default ErrorPage