import { apiClient } from "./ApiClient"


export const executeBasicAuthentication = (token) => apiClient.get(`basicauth`,  {
    headers : {
        Authorization : token
    }
} )

export const executeJwtAuthentication = (username ,  password) => apiClient.post(`authenticate`, {username, password} )