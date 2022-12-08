import React, { useCallback, useContext, useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { apiDiagrama } from '../api/apiDiagrama';
import { authContext } from '../context/authContext';
import LoginPage from '../page/auth/LoginPage';
import RegisterPage from '../page/auth/RegisterPage';
import BoardPage from '../page/board/BoardPage';
import HomePage from '../page/home/HomePage';
import { types } from '../type/types';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {

    const { auth, dispatch } = useContext(authContext);
    const { isAuthenticated } = auth;
    const [validateToken, setvalidateToken] = useState(false);


    const Validate = useCallback(async (token) => {

        let { id } = JSON.parse(atob(token));

        let res = await apiDiagrama(`/user/getOne/${id}`);

        if (!res.ok) {
            return;
        }

        const { name, email } = res.data;

        dispatch({
            type: types.authLogin,
            payload: { id, name, email }
        });

    }, [dispatch]);

    useEffect(() => {

        let token = localStorage.getItem("keyID") || null;

        if (token) {
            Validate(token).then(() => {
                setvalidateToken(true);
            });

            return;
        }

        setvalidateToken(true);

    }, [Validate]);



    if (!validateToken) {
        return <h3 className='text-center'>Loading..</h3>
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PrivateRouter exact path='/' component={HomePage} isAuthenticated={isAuthenticated} />
                    <PrivateRouter exact path='/board/:idsala' component={BoardPage} isAuthenticated={isAuthenticated} />

                    <PublicRouter exact path='/login' component={LoginPage} isAuthenticated={isAuthenticated} />
                    <PublicRouter exact path='/register' component={RegisterPage} isAuthenticated={isAuthenticated} />


                    <Redirect to="/login" />

                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
