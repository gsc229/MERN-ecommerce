import React from 'react'
import {BrowserRouter, Switch, Route}  from 'react-router-dom'
import SignUp from './user/SignUp'
import SignIn from './user/SingIn'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'



const Routes = () => {
  return (
    <div>
      <BrowserRouter>        
        <Switch>
          <Route path='/' exact component={Home} />        
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />   
          <PrivateRoute path='/user/dashboard' exact compenent={Dashboard} />
          <AdminRoute path='/admin/dashboard' exact compenent={AdminDashboard} />
          <AdminRoute path='/create/category' exact compenent={AddCategory} />
          <AdminRoute path='/create/product' exact compenent={AddProduct} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
