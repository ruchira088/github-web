import React from "react"
import { isMergeable } from "services/gitHubService"
import ClosedPullRequest from "./ClosedPullRequest"
import OpenPullRequestCard from "./OpenPullRequest"

import "styles/pull-request-list.scss"

export default ({ openPullRequests, closedPullRequests, user, repository, onSelect }) => (
    <div className="pull-request-list">
        <div className="open-pull-requests">
            {
                openPullRequests.map((openPullRequest, index) =>
                    <OpenPullRequestCard
                        {...openPullRequest}
                        isMergeable={isMergeable(user, repository)}
                        onSelect={() => onSelect(openPullRequest.id)}
                        key={index}/>
                )
            }
        </div>

        <div className="closed-pull-requests">
            {
                closedPullRequests.map((closedPullRequest, index) =>
                    <ClosedPullRequest {...closedPullRequest} key={index}/>
                )
            }
        </div>
    </div>
)