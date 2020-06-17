import axiosWIthAuth from '../utils/axiosWithAuth'

export const createCategory = (userId, category) => {
  return axiosWIthAuth()
  .post(`/category/create/${userId}`, category)
  .then(responese => {
    console.log('response',responese.data)
    return responese.data
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiAdmin createCategory error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const createProduct = (userId, product) => {
  return axiosWIthAuth()
  .post(`/product/create/${userId}`, product)
  .then(responese => {
    console.log('response',responese.data)
    return responese.data
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiAdmin createProduct error.response.data: ', error.response.data)
    return error.response.data
  })
}

export const getCategories = () => {
  return axiosWIthAuth()
  .get(`/category`)
  .then(responese => {
    console.log('response',responese.data.categories)
    return responese.data.categories
  })
  .catch(error =>{
    console.log("ERROR")
    console.log('apiAdmin getCategories error.response.data: ', error.response.data)
    return error.response.data
  })
}