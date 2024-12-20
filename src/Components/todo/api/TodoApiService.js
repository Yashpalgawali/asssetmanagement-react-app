 import { apiClient } from './ApiClient';



//1.  way to call res api
// export function retrieveHelloWorldAPiBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

//2. another way to call the rest api
//export const retrieveHelloWorldAPiBean = () => axios.get('http://localhost:8080/hello-world-bean')

//3. call to rest api with pathvariables
export const retrieveAllTodosForUsernameApi = (username) => apiClient.get(`users/${username}/todos`)

export const deleteTodoApi = (username,id) => apiClient.delete(`users/${username}/todos/${id}`)


export const retrieveTodoApi = (username,id) => apiClient.get(`users/${username}/todos/${id}`)

export const createTodoApi = (username , todo) => apiClient.post(`users/${username}/todos`,todo)

export const updateTodoApi = (username , id , todo) => apiClient.put(`users/${username}/todos/${id}`,todo)

 