import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import {prices} from './fixedPrices'


const Shop = () => {

  const [myFilters, setMyfilters] = useState({
    filters: {category: [], price: []}
  })
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

  // filters/filterBy can be either category or price
  const handleFilters = (filters, filterBy) => {
    //console.log('Shop.js handleFilters: ',filters, filterBy)
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters
    setMyfilters(newFilters)

  }

  return (
    <Layout className='container-fluid' title="Home Page" description="Node React E-commerce App">
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categeory</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={handleFilters} />
          </ul>
          <h4>Filter by Price</h4>
          <div>
            <RadioBox prices={prices} />
          </div>  
        </div>
        
        <div className="col-8">
          right sidebar
          {JSON.stringify(myFilters)}
        </div>
      </div>

    </Layout>
  )
}

export default Shop
