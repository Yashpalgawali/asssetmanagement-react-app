import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from './Security/AuthContext'

function LoginComponent() {

    const[username , setUsername] =  useState('admin')
    const[password , setPassword] =  useState('admin')

    // let[showSuccessMessage , setShowSuccessMessage] =  useState(false)
    let[showErrorMessage , setShowErrorMessage] =  useState(false)
    
    const navigate = useNavigate();
    const authContext = useAuth()

   function handleUsernameChange(event) {
        // console.log(event.target.value)
        setUsername(event.target.value)
   }

   function handlePasswordChange(event) {
    //  console.log(event.target.value)
        setPassword(event.target.value)
   }

   async function handleSubmit() {
    if( await authContext.login(username , password)) {
      
        navigate(`/welcome/${username}`)
    }
    else{
         setShowErrorMessage(true)
    }
   }

//    function SuccessMessageComponent() {
//         if(showSuccessMessage) {
//             return  <div className='successMessage'>Authenticated Successfully</div>
//         }
//         return null
//     }

//    function ErrorMessageComponent() {
//     if(showErrorMessage)
//         return <div className='errorMessage'>Authenticated Failed. Please Check your Credentials</div>
//     return null
//    }

    return(
        <div className="Login">
            <h1>Time to Login!</h1>
            {/* <div className='successMessage'>Authenticated Successfully</div>
                <div className='errorMessage'>Authenticated Failed. Please Check your Credentials</div> */}
           
            {/* <SuccessMessageComponent /> */}
            {/* <ErrorMessageComponent /> */}

            {/* {showSuccessMessage && <div className='successMessage'>Authenticated Successfully</div> } */}
            {showErrorMessage && <div className='errorMessage'>Authenticated Failed. Please Check your Credentials</div> }
            <div className="LoginForm" >
                <div>
                    <label >Enter Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                
                </div>
                <div>
                    <label >Enter Password</label>
                    <input type="password" name="password" value={password}  onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" onClick={handleSubmit} className='btn btn-primary' >Login</button>
                </div>
            </div>
        </div>
    )
}






export default LoginComponent