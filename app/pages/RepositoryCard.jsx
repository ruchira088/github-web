import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { API_DATE_FORMAT } from "services/constants"

import "styles/repository-card.scss"

export default ({ name, language, fullId, pushedAt }) => (
    <Link to={`/repository/${fullId}`} className="repository-card">
        <div className="repository-name">{ name }</div>
        <div className="repository-language">{ language }</div>
        <div className="repository-pushed-at">{ moment(pushedAt, API_DATE_FORMAT).fromNow() }</div>
    </Link>
)