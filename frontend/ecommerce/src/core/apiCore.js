import axiosWIthAuth from '../utils/axiosWithAuth'
import {sortByName} from '../utils/sorterFunctions'
import queryString from 'query-string'

export const getProducts = (sortBy) => {
  return axiosWIthAuth()
  .get(`/products?sortBy=${sortBy}&order=desc&limit=6`)
  .then(responese => {
    console.log('apiCore getProducts response: ',responese.data)
    console.log(responese)
    const products = responese.data
    
    return products
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiCore getProducts error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const getCategories = () => {
  return axiosWIthAuth()
  .get(`/category`)
  .then(responese => {
    console.log('response',responese.data.categories)
    const categories = responese.data.categories 
    categories.sort(sortByName)
    return categories
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiAdmin getCategories error.response.data: ', error.response.data)
    return error.response.data
  })
}


export const getFilteredProducts = (skip, limit, filters={}) => {
  const data = {
    limit,
    skip,
    filters
  }
  return axiosWIthAuth()
  .post(`/products/by/search`, data)
  .then(responese => {
    console.log('response',responese.data)
    return responese.data
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiCore getFilteredProducts error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const list = (params) => {
  const query = queryString.stringify(params)
  console.log('query', query)
  return axiosWIthAuth()
  .get(`/products?${query}`)
  .then(responese => {
    console.log('apiCore list response: ',responese.data)
    console.log(responese)
    const products = responese.data
    
    return products
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiCore list error.response.data: ', error.response.data)
    return error.response.data
  })
}
