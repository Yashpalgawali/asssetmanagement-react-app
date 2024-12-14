function ListToDoComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear()+12,today.getMonth(), today.getDay())
   
    const todos = [
                    {id :1, description:'Learn AWS',done : false , targetDate: targetDate },
                    {id :2, description:'Learn DOCKER' ,done : false , targetDate: targetDate }
                ]

    return(
        <div className="ListToDoComponent">
            <h1>Asset Management</h1>
            <h3>Things You Want to Do!  </h3>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <td>Is Done</td>
                            <td>Target Date</td>
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
                                        <td>{todo.targetDate.toLocaleDateString()}</td>
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