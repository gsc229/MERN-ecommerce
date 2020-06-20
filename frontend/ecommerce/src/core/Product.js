import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {read, listRelated} from '../core/apiCore.js'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false)

  const loadProduct = productId => {
    
    read(productId).then(data => {
      console.log("DATA: ",data)
        if (data.error) {
            setError(data.error);
        } else {            
            setProduct(data);
            // fetch related products
            listRelated(data._id)
            .then(data=>{
              if(data.error){
                console.log('Product.js loadProduct, listRelated data.error: ', data.error)
                setError(data.error)
              } else{
                console.log('Product.js loadProduct, listRelated data:', data)
                setRelatedProducts(data)
              }
            })
        }
    });
};

  useEffect(()=>{
    const productId = props.match.params.productId
    loadProduct(productId)
  }, [props])


  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0,100)}
      className='container-fluid'
    >
      
      <div className="row">
        <div className="col-8">
        {product && product.description && <Card product={product} viewProductButton={false} /> }
        </div>
        <div className="col-4">
        <h4>Related Products</h4>
        {relatedProducts && relatedProducts.map((product, i)=>(
          <div className='mb-3'>
            <Card key={i} product={product} />
          </div>
        ))}
        </div>
      </div>
    </Layout>
  )
}

export default Product
