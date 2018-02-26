import React from "react"
import { Link } from "react-router-dom"
import { relativeTime } from "utils/generalUtils"

import "styles/repository-card.scss"

export default ({ name, language, fullId, pushedAt }) => (
    <Link to={`/repository/${fullId}`} className="repository-card">
        <div className="repository-name">{ name }</div>
        <div className="repository-language">{ language }</div>
        <div className="repository-pushed-at">{ relativeTime(pushedAt) }</div>
    </Link>
)