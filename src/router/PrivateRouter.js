import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRouter = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    if (isAuthenticated) {
        return <Route {...rest} component={Component} />
    }
    return <Redirect to='/login' />
}

export default PrivateRouter
