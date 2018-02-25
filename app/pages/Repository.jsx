import React from "react"
import { Link } from "react-router-dom"
import { getOpenPullRequests, getClosedPullRequests } from "services/gitHubService"
import PullRequestList from "pages/PullRequestList"
import LoadingIcon from "components/LoadingIcon"
import MergeDialog from "./MergeDialog"
import PullRequestFilter from "./PullRequestFilter"

import "styles/repository.scss"

export default class Repository extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            openPullRequests: [],
            closedPullRequests: [],
            showOpenRequests: true,
            showClosedRequests: true,
            showMergeDialog: false,
            selectedPullRequestId: undefined
        }
    }

    componentDidMount() {
        this.fetchPullRequests()
    }

    getUserAndRepoName = () => {
        const { match: { params } } = this.props

        return {
            user: params.user,
            repositoryName: params.repoName
        }
    }

    fetchPullRequests = async () => {
        const { user, repositoryName } = this.getUserAndRepoName()

        this.setState({ loading: true })

        const [ openPullRequests, closedPullRequests ] = await Promise.all([
            getOpenPullRequests(user, repositoryName),
            getClosedPullRequests(user, repositoryName)
        ])

        this.setState({ openPullRequests, closedPullRequests, loading: false })
    }

    onOpenFilterChange = showOpenRequests => {
        this.setState({ showOpenRequests })
    }

    onClosedFilterChange = showClosedRequests => {
        this.setState({ showClosedRequests })
    }


    getBody = () => {
        const { openPullRequests, closedPullRequests, loading, showClosedRequests, showOpenRequests } = this.state

        const { user, repositoryName } = this.getUserAndRepoName()

        return loading ?
            <LoadingIcon label="Fetching pull requests" className="page"/> :
            <PullRequestList
                openPullRequests={openPullRequests}
                closedPullRequests={closedPullRequests}
                onClosedFilterChange={this.onClosedFilterChange}
                onOpenFilterChange={this.onOpenFilterChange}
                showOpenRequests={showOpenRequests}
                showClosedRequests={showClosedRequests}
                user={user}
                repository={repositoryName}
                onSelect={this.setSelectedPullRequestId}
            />

    }

    setSelectedPullRequestId = selectedPullRequestId => {
        this.setState({ selectedPullRequestId, showMergeDialog: true })
    }

    hideMergeDialog = () => {
        this.setState({ showMergeDialog: false })
    }

    onMergeSuccess = () => {
        this.hideMergeDialog()
        this.fetchPullRequests()
    }

    mergeDialog = () => {
        const { showMergeDialog, selectedPullRequestId, openPullRequests } = this.state

        const { user, repositoryName } = this.getUserAndRepoName()
        const selectedPullRequest = openPullRequests.find(({ id }) => id === selectedPullRequestId)

        if (showMergeDialog) {
            return <MergeDialog
                onClose={this.hideMergeDialog}
                user={user}
                repositoryName={repositoryName}
                onSuccess={this.onMergeSuccess}
                pullRequest={selectedPullRequest}/>
        } else {
            return null
        }
    }

    render() {
        const { repositoryName } = this.getUserAndRepoName()

        return (
            <div className="repository">
                <div className="repository-title page-title">
                    { repositoryName }
                </div>
                <Link to="/">Back</Link>
                <div className="repository-content">
                    { this.getBody() }
                </div>
                <div className="merge-dialog-container">
                    { this.mergeDialog() }
                </div>
            </div>
        )
    }
}