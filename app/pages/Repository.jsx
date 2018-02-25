import React from "react"
import { Link } from "react-router-dom"
import { getOpenPullRequests, getClosedPullRequests } from "services/gitHubService"
import PullRequestList from "pages/PullRequestList"
import LoadingIcon from "components/LoadingIcon"

export default class Repository extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            openPullRequests: [],
            closedPullRequests: []
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props

        const [ openPullRequests, closedPullRequests ] = await Promise.all([
            getOpenPullRequests(params.user, params.repoName),
            getClosedPullRequests(params.user, params.repoName)
        ])

        this.setState({ openPullRequests, closedPullRequests, loading: false })
    }

    getBody = () => {
        const { openPullRequests, closedPullRequests, loading } = this.state
        const { match: { params } } = this.props

        return loading ?
            <LoadingIcon/> :
            <PullRequestList
                openPullRequests={openPullRequests}
                closedPullRequests={closedPullRequests}
                user={params.user}
                repository={params.repoName}
            />
    }

    render() {
        return (
            <div className="repository">
                <Link to="/">HOME</Link>
                { this.getBody() }
            </div>
        )
    }
}