import axios from 'axios';


const apiClient = axios.create({
    baseURL : 'http://localhost:8080/'
})


//1.  way to call res api
// export function retrieveHelloWorldAPiBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

//2. another way to call the rest api
//export const retrieveHelloWorldAPiBean = () => axios.get('http://localhost:8080/hello-world-bean')

//3. call to rest api with pathvariables
export const retrieveHelloWorldAPiBeanPathVariable = (username) => axios.get(`http://localhost:8080/hello-world/path-variable/${username}`)

//4. After implementing the common url 
export const retrieveHelloWorldAPiBean = () => apiClient.get('hello-world-bean')