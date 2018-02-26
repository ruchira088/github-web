import React from "react"
import moment from "moment"
import LoadingIcon from "components/LoadingIcon"
import { merge } from "services/gitHubService"
import { API_DATE_FORMAT } from "services/constants"

import "styles/merge-dialog.scss"

export default class MergeDialog extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            message: "",
            loading: false
        }
    }

    onMessageChange = ({ target }) => {
        this.setState({ message: target.value })
    }

    mergePullRequest = async () => {
        const { message } = this.state
        const { user, repositoryName, pullRequest, onSuccess } = this.props

        this.setState({ loading: true })

        const { isMerged, message: responseMessage } = await merge(user, repositoryName)(pullRequest.number, message)

        if (isMerged) {
            console.log(responseMessage)
            this.setState({ loading: false })
            onSuccess()
        } else {
            console.error("Unable to merge pull request.")
        }
    }

    dialogBoxContent = () => {
        const { message } = this.state
        const { onClose, pullRequest } = this.props

        return (
            <div>
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
        )
    }

    loadingDialog = () => <LoadingIcon label="Merging pull request"/>

    render() {
        const { loading } = this.state

        return (
            <div className="merge-dialog">
                <div className="merge-dialog-box">
                    { loading ? this.loadingDialog() : this.dialogBoxContent() }
                </div>
            </div>
        )
    }
}