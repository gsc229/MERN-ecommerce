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
    // sort the categories by name A-Z
    const categories = responese.data.categories
    function compare(a,b){
      const catA = a.name.toUpperCase()
      const catB = b.name.toUpperCase()
      let comparison = 0
      if(catA > catB){
        comparison = 1
      } else if(catA < catB){
        comparison = -1
      }

      return comparison
    }

    categories.sort(compare)

    return categories
  })
  .catch(error =>{
    console.log("ERROR", error.response.data)
    
    
  })
}