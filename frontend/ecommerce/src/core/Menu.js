import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
const isActive = (history, path)=>{
  if(history.location.pathname === path){
    return {color: '#ff9900'}
  } else{
    return {color: "#ffffff"}
  }
}

const Menu = ({history}) => {
  
  
  return (
    <div>      
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
        </li>


        {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Sign In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Sign Up</Link>
          </li>
        </Fragment>
        )}

        
        {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
            <span 
            className="nav-link"  
            style={{cursor: 'pointer', color: 'white'}}
            onClick={()=>{
              signout(()=>{
                history.push("/")
              })
            }}
            >Sign Out</span>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard" style={isActive(history, '/dashboard')}>Dashboard</Link>
          </li>
          </Fragment>
        )}       

      </ul>
    </div>
  )
}

export default withRouter(Menu)
