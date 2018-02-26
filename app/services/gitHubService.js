import axios from "axios"

const axiosClient = axios.create({
    baseURL: "http://localhost:8000"
})

export const getRepositories =
    async () => {
        const response = await axiosClient.get("/repository")
        return response.data
    }

const getPullRequests =
    state => async (userId, repoName) => {
        const response = await axiosClient.get(`/repository/${userId}/${repoName}/pull-request/${state}`)
        return response.data
    }

export const isMergeable =
    (userId, repoName) => async pullReqNumber => {
        const response = await axiosClient.get(`/repository/${userId}/${repoName}/pull-request/${pullReqNumber}/mergeable`)
        return response.data.isMergeable
    }

export const merge =
    (userId, repoName) => async (pullReqNumber, message) => {
        const response =
            await axiosClient.post(
                `/repository/${userId}/${repoName}/pull-request/${pullReqNumber}/merge`,
                { message }
            )

        return response.data
    }

export const ping = () => axiosClient.get("/")

export const getClosedPullRequests = getPullRequests("closed")
export const getOpenPullRequests = getPullRequests("open")