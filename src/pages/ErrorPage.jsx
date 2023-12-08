import { Button, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }

    return(<div className='margin-div center'>
        <Typography gutterBottom variant="h2" component="div">
            Someting went Wrong!</Typography>
        <Button variant="contained" onClick={goToHome}>SaveMe!</Button>

    </div>)

}

export default ErrorPage