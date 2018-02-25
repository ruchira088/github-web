import React from "react"
import RepositoryCard from "./RepositoryCard"

import "styles/repository-list.scss"

export default ({ repositories }) => (
    <div className="repository-list">
        {
            repositories.map((repository, index) =>
                <RepositoryCard {...repository} key={index}/>
            )
        }
    </div>
)