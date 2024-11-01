import axiosApi from "../api/axios.ts";

export function addAccessTokenToAuthHeader(token: string | undefined) {
    if (token) axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else {
        removeAccessTokenFromAuthHeader()
    }
}

export function removeAccessTokenFromAuthHeader() {
    delete axiosApi.defaults.headers.common['Authorization']
}
