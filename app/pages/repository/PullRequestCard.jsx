import React from "react"
import { relativeTime } from "utils/generalUtils"

export default ({ number, title, state, createdAt }) => (
    <div className="pull-request-card">
        <div className="pull-request-number">
            Pull Request #{ number }
        </div>
        <div className="pull-request-title">
            { title }
        </div>
        <div className="pull-request-state">
            { state.toUpperCase() }
        </div>
        <div className="pull-request-created-data">
            { relativeTime(createdAt) }
        </div>
    </div>
)