import React from "react"
import loadingIcon from "assets/loading.svg"

export default ({ label = "Loading" }) => (
    <div className="loading-icon">
        <div className="loading-image">
            <img src={ loadingIcon }/>
        </div>
        <div className="loading-text">
            { label }
        </div>
    </div>
)