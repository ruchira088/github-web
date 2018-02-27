import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import PropRoute from "components/PropRoute"
import HomePage from "pages/home/HomePage"
import Repository from "pages/repository/RepositoryPage"

export default ({ onServerError }) => (
    <Router>
        <div>
            <PropRoute exact path="/" component={HomePage} onServerError={onServerError}/>
            <PropRoute path="/repository/:user/:repoName" component={Repository} onServerError={onServerError}/>
        </div>
    </Router>
)