import React from "react"
import { isMergeable } from "services/gitHubService"
import PullRequestCard from "./PullRequestCard"
import OpenPullRequestCard from "./OpenPullRequest"
import MergeDialog from "./MergeDialog"

export default ({ openPullRequests, closedPullRequests, user, repository }) => (
    <div className="pull-request-list">
        {
            openPullRequests.map((openPullRequest, index) =>
                <OpenPullRequestCard {...openPullRequest} isMergeable={isMergeable(user, repository)} key={index}/>
            )
        }

        {
            closedPullRequests.map((closedPullRequest, index) =>
                <PullRequestCard {...closedPullRequest} key={index}/>
            )
        }

        <MergeDialog/>
    </div>
)