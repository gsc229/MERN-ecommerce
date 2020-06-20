import axiosWIthAuth from '../utils/axiosWithAuth'
import {sortByName} from '../utils/sorterFunctions'
import queryString from 'query-string'
import {API} from '../config'

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
  console.log('apiCore list query', query)
  return axiosWIthAuth()
  .get(`/products/search?${query}`)
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

export const read = (productId) => {

  console.log('apiCore read productId: ', productId)

  return axiosWIthAuth()
  .get(`/product/${productId}`)
  .then(response => {
    console.log('apiCore read response: ',response)    
    const product = response.data.product
    console.log(product)
    return product
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiCore read error.response.data: ', error.response)
    return error.response
  })
}


