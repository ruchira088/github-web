import React from "react"
import moment from "moment"
import { API_DATE_FORMAT } from "services/constants"

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
            { moment(createdAt, API_DATE_FORMAT).fromNow() }
        </div>
    </div>
)