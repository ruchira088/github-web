import React from "react"

import "styles/pull-request-filter.scss"

export default ({ showOpenRequests, showClosedRequests, onOpenFilterChange, onClosedFilterChange }) => (
    <div className="pull-request-filter">
        <div className="open-filter">
            <input
                type="checkbox"
                checked={showOpenRequests}
                onChange={({ target }) => onOpenFilterChange(target.checked)}/> Open
        </div>
        <div className="closed-filter">
            <input
                type="checkbox"
                checked={showClosedRequests}
                onChange={({ target }) => onClosedFilterChange(target.checked)}/> Closed
        </div>
    </div>
)