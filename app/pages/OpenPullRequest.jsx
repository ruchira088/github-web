import React from "react"
import LoadingIcon from "components/LoadingIcon"
import PullRequestCard from "pages/PullRequestCard"

export default class OpenPullRequest extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            mergeable: undefined
        }
    }

    async componentDidMount() {
        const { isMergeable, number } = this.props

        const mergeable = await isMergeable(number)

        this.setState({ mergeable, loading: false })
    }

    mergeButton = mergeable => mergeable ? <div>Merge</div> : <div>Outdated</div>

    mergeStatus = () => {
        const { mergeable, loading } = this.state

        return loading ? <LoadingIcon/> : this.mergeButton(mergeable)
    }

    render() {
        return (
            <div className="open-pull-request">
                <PullRequestCard {...this.props}/>
                { this.mergeStatus() }
            </div>
        )
    }
}