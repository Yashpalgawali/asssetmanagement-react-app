import { createContext, useContext } from "react";
import { useState } from "react";
//1. Create a Context
export const AuthContext = createContext()

// Hook is created
export const useAuth =() => useContext(AuthContext)

//2. Share the created context with other components
export default function AuthProvider( { children } ) {

    //3. Put some state in the context
    const [isAuthenticated , setAuthenticated] = useState(false)

    const [username , setUsername] = useState(null)

   // const valueToBeShared = [number ,isAuthenticated ,setAuthenticated ]

    return(
        // <AuthContext.Provider value={{ valueToBeShared }}>
        <AuthContext.Provider value={{ isAuthenticated ,setAuthenticated, login, logout, username }}>

            {children}
        </AuthContext.Provider>
    )


    function login(username , password) {
        if(username==='admin' && password==='admin') {
            setAuthenticated(true)
            setUsername(username)
            return true
        }
        else {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logout() {
        setAuthenticated(false) 
    }
}