import React from "react"
import AppRouter from "./AppRouter"
import { ping } from "services/gitHubService"

import "styles/app.scss"

const ApiServerUnavailable = () => (
    <div className="api-server-unavailable">
        API server is NOT available
    </div>
)

const ApiServerErrors = ({ errors }) => (
    <div className="api-server-errors">
        <div className="api-server-errors-title">
            The API server is encountered the following errors
        </div>
        <div className="errors-list">
            {
                errors.map(({ errorMessage }, index) =>
                    <div className="api-server-error" key={index}>
                        { errorMessage }
                    </div>
                )
            }
        </div>
    </div>
)

export default class App extends React.Component
{
    constructor(props) {
        super(props)

        this.state = {
            serviceAvailable: true,
            errors: []
        }
    }

    componentDidMount() {
        ping()
            .catch(({ response }) => {

                if (response === undefined) {
                    this.setState({ serviceAvailable: false })
                } else {
                    this.setState({ errors: [response.data] })
                }
            })
    }

    getServiceBody = () => {
        const { errors } = this.state

        if (errors.length == 0) {
            return (
                <div className="app">
                    <AppRouter/>
                </div>
            )
        } else {
            return <ApiServerErrors errors={errors}/>
        }
    }

    render() {
        const { serviceAvailable } = this.state

        if (serviceAvailable) {
            return this.getServiceBody()
        } else {
            return <ApiServerUnavailable/>
        }
    }
}