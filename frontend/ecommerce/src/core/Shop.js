import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './apiCore'
import Checkbox from './Checkbox'

const Shop = () => {


  const [categories, setCategories] = useState([])
  const [error, setError] = useState([])
  console.log('categories: ',categories)
  const init = () => { 
    getCategories().then(data => {
      if(data.error){
        console.log('ERROR AddProduct.js init')
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }


  useEffect(()=>{
    init()
  },[])

  return (
    <Layout className='container-fluid' title="Home Page" description="Node React E-commerce App">
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categeory</h4>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>
        <div className="col-8">
          right sidebar
        </div>
      </div>
    </Layout>
  )
}

export default Shop
