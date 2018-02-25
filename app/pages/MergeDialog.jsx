import React from "react"
import { merge } from "services/gitHubService"

export default class MergeDialog extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            message: ""
        }
    }

    onMessageChange = ({ target }) => {
        this.setState({ message: target.value })
    }

    mergePullRequest = async () => {
        const { message } = this.state
        const { user, repositoryName, pullRequest, onSuccess } = this.props

        const { isMerged } = await merge(user, repositoryName)(pullRequest.number, message)

        if (isMerged) {
            onSuccess()
        } else {
            console.error("")
        }

    }

    render() {
        const { message } = this.state
        const { onClose } = this.props

        return (
            <div className="merge-dialog">
                <div className="commit-message-box">
                    <textarea
                        placeholder="Enter merge message..."
                        value={message}
                        onChange={this.onMessageChange}/>
                </div>
                <button onClick={this.mergePullRequest}>Merge</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        )
    }
}