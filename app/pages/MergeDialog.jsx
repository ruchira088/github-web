import React from "react"
import moment from "moment"
import { merge } from "services/gitHubService"
import { API_DATE_FORMAT } from "services/constants"

import "styles/merge-dialog.scss"

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
        const { onClose, pullRequest } = this.props

        return (
            <div className="merge-dialog">
                <div className="merge-dialog-box">
                    <div className="merge-dialog-title">
                        { pullRequest.title } ({ moment(pullRequest.createdAt, API_DATE_FORMAT).fromNow() })
                    </div>
                    <div className="commit-message-box">
                    <textarea
                        placeholder="Enter merge message..."
                        value={message}
                        onChange={this.onMessageChange}
                        className="merge-message"/>
                    </div>
                    <button onClick={this.mergePullRequest} className="button">Merge</button>
                    <button onClick={onClose} className="button">Cancel</button>
                </div>
            </div>
        )
    }
}