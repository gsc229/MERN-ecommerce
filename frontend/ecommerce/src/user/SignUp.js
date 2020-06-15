import React, {useState} from 'react'
import Layout from '../core/Layout'
import axios from 'axios'
import axiosWithAuth from '../utils/axiosWithAuth'
import {API} from '../config'
const SignUp = () => {
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  
  const {name, email, password} = values

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const signup = (user) => {
    console.log(name, email, password)
    axiosWithAuth()
    .post(`/signup`, user)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const clickSubmit =  (event) => {
    event.preventDefault()
    signup({name, email, password})
  }

  const signUpForm = () => (
    <form>
      <div className="form-group">
        
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className='form-control'/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')}  type="text" className='form-control'/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="text" className='form-control'/>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  return (
    <Layout 
    title="Sign Up" 
    description="Sign up for Node React E-commerce App" 
    className='container col-md-8 offset-md-2'>
      {signUpForm()}    
    </Layout>
  )
}

export default SignUp
