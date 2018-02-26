import React from "react"
import PullRequestCard from "./PullRequestCard"

export default ({ ...props }) => (
    <div className="closed-pull-request">
        <PullRequestCard {...props}/>
    </div>
)