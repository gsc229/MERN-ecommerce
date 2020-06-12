import React from 'react'
import {BrowserRouter, Switch, Route}  from 'react-router-dom'
import SignUp from './user/SignUp'
import SignIn from './user/SingIn'
import Home from './core/Home'
import Menu from './core/Menu'
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Switch>        
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/home' exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
