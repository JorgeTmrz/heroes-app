import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest

}) => {
    return (
        <Route {...rest}
            component = {(props) => (
                (isAuthenticated)
                ? <PrivateRoute 
                    isAuthenticated = {true}
                    component = {DashboardRoutes}
                />
                : <Component/>
            )}
        />
    )
}
