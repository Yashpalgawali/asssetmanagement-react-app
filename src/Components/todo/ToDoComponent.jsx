import { Navigate, useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./Security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"




export default function TodoComponent(){

    const {id} = useParams()
    const {username} = useAuth()

    const [description , setDescription] = useState('')
    const [targetDate , setTargetDate] = useState('')
    const navigate = useNavigate()

    useEffect( 
        () => retrieveTodo() 
    )

    function retrieveTodo() {
    if(id!= -1)
        {
            retrieveTodoApi(username,id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
        }
               
    }

    function onSubmit(values) {

        console.log(values)
        const todo = {
            id : id ,
            username : username ,
            description : values.description,
            targetDate :  values.targetDate,
            done : false
        }
    
       if(id== -1){
                createTodoApi(username,todo)
                        .then(response => {
                            console.log(response)
                            // setDescription(response.data.description)
                            // setTargetDate(response.data.targetDate)
                            navigate('/todos')
                        })
        }  
        else {
                updateTodoApi(username,id,todo)
                .then(response => {
                    console.log(response)
                    // setDescription(response.data.description)
                    // setTargetDate(response.data.targetDate)
                    navigate('/todos')
                })
        }

        
    }

    function validate(values) {
        let errors = {
            // description : 'Enter a valid description',
            // targetDate : 'Enter a valid date'
        }
        if(values.description.length<5 || values.description==='') {
            errors.description = 'Enter at least 5 characters for description'
        }

        if(values.targetDate===null || values.targetDate==='' || moment(values.targetDate).isValid()) {
            errors.targetDate= 'Enter a valid date'
        }
        console.log(values)
        return errors
    }

    return(
        <div className="container">
            <h1> Enter TODO details </h1>
            <div>
                <Formik initialValues={ {description , targetDate }}  
                        enableReinitialize='true' 
                        onSubmit = {onSubmit}
                        validate = {validate}
                >
                    {  (props) => (
                              
                            <Form >
                                 <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                 <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                <fieldset className="form-group" >
                                    <label htmlFor="description">Description </label>
                                    <Field type="text" placeholder="Enter Description" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group" >
                                    <label htmlFor="targetDate">Target Date </label>
                                    <Field type="date" placeholder="Enter TargetDate" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        ) 
                    }
                </Formik>
            </div>
        </div>
    )
} 