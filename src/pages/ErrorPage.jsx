import {useNavigate} from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    return(<div className='margin-div'>
        <h1>Someting went Wrong!</h1>
        <button onClick={goToHome}>SaveMe!</button>

    </div>)

}

export default ErrorPage