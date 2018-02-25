import React from "react"
import LoadingIcon from "components/LoadingIcon"
import PullRequestCard from "pages/PullRequestCard"

import "styles/open-pull-request.scss"

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

    mergeButton = () => {
        const { mergeable } = this.state
        const { onSelect } = this.props

        if (mergeable) {
            return <div onClick={onSelect} className="merge-enabled">Merge</div>
        } else {
            return <div className="merge-disabled">Unable to merge</div>
        }
    }

    mergeStatus = () => {
        const { loading } = this.state

        return loading ? <LoadingIcon/> : this.mergeButton()
    }

    render() {
        return (
            <div className="open-pull-request">
                <PullRequestCard {...this.props}/>
                <div className="merge-status">
                    { this.mergeStatus() }
                </div>
            </div>
        )
    }
}