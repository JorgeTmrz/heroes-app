import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest // the rest of the args passed to the component
}) => {

    const {location: {pathname: lastVisitedPage} = "/"} = rest;
    localStorage.setItem('lastPath', lastVisitedPage) // setting the las visited page on the localstorage

    return (
        <Route {...rest}
            component = {
                (props) => (
                    (isAuthenticated)
                    ? <Component {...props}/>
                    : <Redirect to = "/login" />
                )
            }
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    Component: PropTypes.func.isRequired
}