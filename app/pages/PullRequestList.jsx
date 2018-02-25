import React from "react"
import { isMergeable } from "services/gitHubService"
import PullRequestFilter from "./PullRequestFilter"
import ClosedPullRequest from "./ClosedPullRequest"
import OpenPullRequestCard from "./OpenPullRequest"

import "styles/pull-request-list.scss"

export default ({ openPullRequests, closedPullRequests, user, repository, onSelect,
                    showOpenRequests, showClosedRequests, onClosedFilterChange, onOpenFilterChange }) => (
    <div className="pull-request-list">
        <PullRequestFilter
            onClosedFilterChange={onClosedFilterChange}
            onOpenFilterChange={onOpenFilterChange}
            showOpenRequests={showOpenRequests}
            showClosedRequests={showClosedRequests}/>
        <div className="open-pull-requests">
            {
                openPullRequests
                    .filter(() => showOpenRequests)
                    .map((openPullRequest, index) =>
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
                closedPullRequests
                    .filter(() => showClosedRequests)
                    .map((closedPullRequest, index) =>
                    <ClosedPullRequest {...closedPullRequest} key={index}/>
                )
            }
        </div>
    </div>
)