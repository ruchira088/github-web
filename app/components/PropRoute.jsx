import React from "react"
import { Route } from "react-router-dom"

export default ({ component, children, ...props }) =>
    <Route {...props}
           render={routerProps => React.createElement(component, Object.assign({}, props, routerProps), children)}/>