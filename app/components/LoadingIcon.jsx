import React from "react"
import classNames from "classnames"
import loadingIcon from "assets/loading.svg"

export default ({ label = "Loading", className }) => (
    <div className={classNames("loading-icon", className)}>
        <div className="loading-image">
            <img src={ loadingIcon }/>
        </div>
        <div className="loading-text">
            { label }
        </div>
    </div>
)