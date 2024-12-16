import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsername, retrieveAllTodosForUsernameApi } from "./api/TodoApiService"
import { useAuth } from "./Security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListToDoComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear()+12,today.getMonth(), today.getDay())
   
    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    const [todos ,setTodos] = useState([])

    const [message ,setMessage] = useState(null)
    // const todos = [
    //                 // {id :1, description:'Learn AWS',done : false , targetDate: targetDate },
    //                 // {id :2, description:'Learn DOCKER' ,done : false , targetDate: targetDate }
    //             ]

    // useEffect - tell React that your component needs to do something after render.
    useEffect(()=>refreshTodos(), []) 

    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
            .then((response)=> {
                setTodos(response.data)
            })
            .catch((error)=>console.log(error))
    }
    
    function deleteTodo(id) {
        console.log('clicked '+id)
        deleteTodoApi(username,id)
            .then(
                ()=>{
                    setMessage(`Delete of TODO with ID ${id} successful` )
                    refreshTodos()
                }
            )
            .catch((error)=>console.log(error))
    }

    function updateTodo(id) {
        console.log('clicked '+id)
         navigate(`/todo/${id}`)
    }


    return(
        <div className="ListToDoComponent">
           
            <h3 className="mb-5">Things You Want to Do!  </h3>
            
            <div className='container'>
                
                {message && <div className="alert alert-danger"> {message}</div> }
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <td>Is Done</td>
                            <td>Target Date</td>
                            <td>DELETE</td>
                            <td>UPDATE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toLocaleDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td>
                                        <button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)} >DELETE</button>
                                        
                                        </td>
                                        <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)} >UPDATE</button></td>
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ListToDoComponent