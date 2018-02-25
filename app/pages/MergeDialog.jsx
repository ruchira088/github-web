import React from "react"

export default class MergeDialog extends React.Component
{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="merge-dialog">
                <div className="commit-message-box">
                    <textarea/>
                </div>
                <button>Merge</button>
            </div>
        )
    }
}