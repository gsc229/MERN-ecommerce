import React from 'react'
import Layout from '../core/Layout'

const SignUp = () => {

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <lable className="text-muted">Name</lable>
        <input type="text" className='form-control'/>
      </div>
      <div className="form-group">
        <lable className="text-muted">Email</lable>
        <input type="text" className='form-control'/>
      </div>
      <div className="form-group">
        <lable className="text-muted">Password</lable>
        <input type="text" className='form-control'/>
      </div>
      <button className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  return (
    <Layout title="Sign Up" description="Sign up for Node React E-commerce App" className='container'>
      {signUpForm()}    
    </Layout>
  )
}

export default SignUp
