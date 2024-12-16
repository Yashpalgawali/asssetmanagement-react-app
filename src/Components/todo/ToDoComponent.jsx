import { useParams } from "react-router-dom"
import { retrieveTodoApi } from "./api/TodoApiService"
import { useAuth } from "./Security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"




export default function TodoComponent(){

    const {id} = useParams()
    const {username} = useAuth()

    const [description , setDescription] = useState('')
    const [targetDate , setTargetDate] = useState('')
    useEffect( 
        () => retrieveTodo() 
    )

    function retrieveTodo() {
    
        retrieveTodoApi(username,id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
               
    }

    function onSubmit(values){

        console.log(values)
    }

    function validate(values){
        let errors = {
            // description : 'Enter a valid description',
            // targetDate : 'Enter a valid date'
        }
        if(values.description.length<5)
        {
            errors.description = 'Enter at least 5 characters for description'
        }

        if(values.targetDate==null)
        {
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