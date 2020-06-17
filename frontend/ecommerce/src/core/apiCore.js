import axiosWIthAuth from '../utils/axiosWithAuth'



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