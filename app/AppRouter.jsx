import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from "pages/HomePage"
import Repository from "pages/Repository"

export default () => (
    <Router>
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/repository/:user/:repoName" component={Repository}/>
        </div>
    </Router>
)