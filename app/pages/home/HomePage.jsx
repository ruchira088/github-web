import React from "react"
import { getRepositories } from "services/gitHubService"
import LoadingIcon from "components/LoadingIcon"
import RepositoryList from "./RepositoryList"

import "styles/home-page.scss"

export default class HomePage extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            repositories: []
        }
    }

    async componentDidMount() {
        const repositories = await getRepositories()

        this.setState({ repositories, loading: false })
    }

    getBody = () => {
        const { loading, repositories } = this.state

        return loading ?
            <LoadingIcon label="Loading repositories" className="page"/> :
            <RepositoryList repositories={repositories}/>
    }

    render() {
        return (
            <div className="home-page">
                <div className="page-title">
                    Repository List
                </div>
                <div className="home-page-body">
                    { this.getBody() }
                </div>
            </div>
        )
    }
}