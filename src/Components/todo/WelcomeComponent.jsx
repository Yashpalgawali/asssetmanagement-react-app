import axios from 'axios';
import {  Link, useParams} from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldAPiBean, retrieveHelloWorldAPiBeanPathVariable } from './api/HelloWorldApiService';

function WelcomeComponent() {

    const params = useParams();
    //console.log(params.username)
    // instead of direct approach , we can deconstruct the object dierectly, Use Following

    const {username} = useParams();
   // console.log(username)

   const [message , setMessage] =  useState(null)

   function callHelloWorldRestApi() {
    axios.get('http://localhost:8080/hello-world')
         .then( (response) =>  successfulResponse(response) )
         .catch((err) => errorResponse(err))
         .finally(()=> console.log('cleanup'))
}

function callHelloWorldRestBeanApi(){
    retrieveHelloWorldAPiBean()
         .then( (response) =>  successfulResponse(response) )
         .catch((err) => errorResponse(err))
         .finally(()=> console.log('cleanup'))
}

function callHelloWorldRestBeanPathVariableApi(){
    retrieveHelloWorldAPiBeanPathVariable('Yashpal')
         .then( (response) =>  successfulResponse(response) )
         .catch((err) => errorResponse(err))
         .finally(()=> console.log('cleanup'))
}

   function successfulResponse(response) {
        setMessage(response.data.message)
        console.log(response)
   }

   function errorResponse(error) {
    console.log(error)

   }

    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
                <div>
                    {/* Your Todos <a href="/todos">GO Here</a> */}
                    Your Todos <Link to="/todos">GO Here</Link>
                </div>
                <div>
                    <button className="btn btn-success m-5" onClick={callHelloWorldRestApi} >Call Hello World </button>
                </div>
                <div>
                    {/* <button className="btn btn-success m-5" onClick={callHelloWorldRestBeanApi} >Call Hello World Bean </button> */}
                    <button className="btn btn-success m-5" onClick={callHelloWorldRestBeanPathVariableApi} >Call Hello World Bean Path </button>
                </div>
                <div className='text-info' > {message}</div>
        </div>
    )
}
export default WelcomeComponent