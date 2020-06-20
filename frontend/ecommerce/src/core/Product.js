import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {read} from '../core/apiCore.js'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  const loadProduct = productId => {
    
    read(productId).then(data => {
      console.log("DATA: ",data)
        if (data.error) {
            setError(data.error);
        } else {
            setProduct(data);
            // fetch related products
            
        }
    });
};

  useEffect(()=>{
    const productId = props.match.params.productId
    loadProduct(productId)
  }, [])


  return (
    <Layout
      title='Home Page'
      description='Node React E-commerece App'
      className='container-fluid'
    >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        {JSON.stringify(product)}
      </div>
    </Layout>
  )
}

export default Product
