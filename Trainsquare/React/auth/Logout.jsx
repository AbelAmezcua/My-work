import * as auth from '../../services/authService'
import { useNavigate } from 'react-router-dom';

import logger from 'sabio-debug';
const _logger = logger.extend('Logout');

export const Logout = () => {
    const navigate = useNavigate();

    const onSuccessfulLogout = (response) =>{
        _logger('Logout success', response)
    };

    const navigateToLanding = () => {
        navigate('/');
    };

    auth.logOut().then(onSuccessfulLogout).then(navigateToLanding);

    return( null);
};