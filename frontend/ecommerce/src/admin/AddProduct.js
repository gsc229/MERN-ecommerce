import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createCategory} from './apiAdmin'

const AddProduct = () => {

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  const {
  name,
  description,
  price,
  categories,
  category,
  shipping,
  quantity,
  photo,
  loading,
  error,
  createdProduct,
  redirectToProfile,
  formData
  } = values

  const {user} = isAuthenticated()
  
  useEffect(()=>{
    setValues({...values, formData: new FormData()})

  },[])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({...values, [name]: value})
  }


  const clickSubmit = (e) => {
    //
  }

  const newPostForm = () => (
    <form onSubmit={clickSubmit} className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary" htmlFor="">
          <input onChange={handleChange('photo')}  type="file" name="photo" accept="image/*"/>
        </label>        
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input 
        onChange={handleChange('name')} 
        type="text"
        className='form-control'
        value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea 
        onChange={handleChange('description')} 
        type="text"
        value={description}
        className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input 
        onChange={handleChange('price')} 
        type="number"
        value={price}
        className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
        onChange={handleChange('category')} 
        className='form-control'
        >

        <option value="5ee970b53043942108611142">Drupal</option>
        <option value="5ee966ff304394210861112a">Rest Framework</option>
        <option value="5ed52fc8944a7123c8e3cf25">Node</option>
        <option value="5ed5755c7119ff40b03ca3cc">React</option>

        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          onChange={handleChange("shipping")}
          className="form-control"
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input 
        onChange={handleChange('quantity')} 
        type="number"
        value={quantity}
        className="form-control"
        />
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )

  return (
    <Layout 
    title="Add a new product" 
    description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className='row'>
        <div className="col-md-8 offset-md-2">
          {newPostForm()} 
        </div>
      </div> 
    </Layout>  
  )
}

export default AddProduct
