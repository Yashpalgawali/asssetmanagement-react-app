import { createContext, useContext } from "react";
import { useState } from "react";
import { executeBasicAuthentication, executeJwtAuthentication } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1. Create a Context
export const AuthContext = createContext()

// Hook is created
export const useAuth =() => useContext(AuthContext)

//2. Share the created context with other components
export default function AuthProvider( { children } ) {

    //3. Put some state in the context
    const [isAuthenticated , setAuthenticated] = useState(false)

    const [username , setUsername] = useState(null)

    const [token , setToken] = useState(null)
   // const valueToBeShared = [number ,isAuthenticated ,setAuthenticated ]

    return(
        // <AuthContext.Provider value={{ valueToBeShared }}>
        <AuthContext.Provider value={{ isAuthenticated ,setAuthenticated, login, logout, username,token }}>

            {children}
        </AuthContext.Provider>
    )

//Basic Authentication
    // async function login(username , password) {
    //     const basicAuthToken = 'Basic '+ btoa(username +':'+password)
    //     try{
    //         const response = await executeBasicAuthentication(basicAuthToken)
                                        
    //         if(response.status===200) {
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(basicAuthToken)

    //             // This will intercept each request and send the token along with each request
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting')
    //                     config.headers.Authorization = basicAuthToken
    //                     return config
    //                 }
    //             )

    //             return true
    //         }
    //         else {
    //             logout()
    //             return false
    //         }
    //     }
    //     catch(error){
    //        logout()
    //         return false
    //     }
    // }

    // function login(username , password) {
    //     if(username==='admin' && password==='admin') {
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }
    //     else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }


    // JWT authentication

    async function login(username , password) {
        
        try{
            const response = await executeJwtAuthentication(username,password)
                                        
            if(response.status===200) {
                const jwtToken = 'Bearer '+response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                // This will intercept each request and send the token along with each request
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            }
            else {
                logout()
                return false
            }
        }
        catch(error){
           logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false) 
        setToken(null)
        setUsername(null)
    }
}