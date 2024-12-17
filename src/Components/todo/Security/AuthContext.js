import { createContext, useContext } from "react";
import { useState } from "react";
import { executeBasicAuthentication } from "../api/HelloWorldApiService";

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


    async function login(username , password) {
        const basicAuthToken = 'Basic '+ btoa(username +':'+password)
        try{
            const response = await executeBasicAuthentication(basicAuthToken)
                                        
            if(response.status==200) {
                setAuthenticated(true)
                setUsername(username)
                setToken(basicAuthToken)
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

    function logout() {
        setAuthenticated(false) 
        setToken(null)
        setUsername(null)
    }
}