import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories, getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import {prices} from './fixedPrices'


const Shop = () => {

  const [myFilters, setMyfilters] = useState({
    filters: {category: [], price: []}
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState([])
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])
 
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


  


  const handlePrice = (id)=> {
    const data = prices
    let array = []
    
    for(let index in data){
      if(data[index]._id === parseInt(id)){
        array = data[index].array
      }
    }

    return array

  }


  // filters/filterBy can be either category or price
  const handleFilters = (filters, filterBy) => {
    console.log('Shop.js handleFilters: ',filters, filterBy)

    const newFilters = {...myFilters}

    if(filterBy == 'price'){
      console.log('price Filter: ', filters)
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    } else{
      newFilters.filters[filterBy] = filters
    }
    loadFilteredResults(myFilters.filters)
    setMyfilters(newFilters)
    
  }
  console.log('myFilters', myFilters)
  console.log('Shop.js filteredResults: ', filteredResults)


  const loadFilteredResults = (newFilters) => {
    console.log('loadFilteredResults: ',newFilters)
    getFilteredProducts(skip, limit, newFilters)
    .then(data=>{
      if(data.error){
        setError(data.error)
      } else{
        setFilteredResults(data)
      }
    })
  }

  useEffect(()=>{
    init()
    loadFilteredResults(myFilters.filters)
  },[])

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
            <RadioBox prices={prices} handleFilters={handleFilters}  />
          </div>  
        </div>
        
        <div className="col-8">          
          {JSON.stringify(filteredResults)}
        </div>
      </div>

    </Layout>
  )
}

export default Shop
