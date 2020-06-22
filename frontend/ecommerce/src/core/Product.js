import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import Layout from './Layout'
import Card from './Card'
import RelatedProducts from './RelatedProducts'
import {read, listRelated} from '../core/apiCore.js'
import {checkForItemInCart} from './cartHelpers'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [itemInCart, setItemInCart] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState(false)
  //console.log('PRODUCT PROPS: ', props)
  const loadProduct = productId => {
    console.log('!!!!!!!!!!!!!!LOAD PRODUCT!!!!!!!!!!!!!!')
    read(productId).then(data => {
      console.log("DATA: ",data)
        if (data.error) {
            setError(data.error);
        } else {            
          setProduct(data);
          setItemInCart(checkForItemInCart(data._id))
          
          // fetch related products
          listRelated(data._id)
          .then(data=>{
            if(data.error){
              console.log('Product.js loadProduct, listRelated data.error: ', data.error)
              setError(data.error)
            } else{
              //console.log('Product.js loadProduct, listRelated data:', data)
              setRelatedProducts(data)
            }
          })
        }
    });
};

  useEffect(()=>{
    const productId = props.match.params.productId
    loadProduct(productId)
  }, [props, refresh])


  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0,100)}
      className='container-fluid'
    >
      <div className="row">
        <div className="col-8">
        {product && product.description && 
        <Card 
        props={props}
        itemInCart={itemInCart}
        product={product} 
        viewProductButton={false}        
        refresh={refresh}
        setRefresh={setRefresh}
        />}
        </div>
        <div className="col-4">        
        <RelatedProducts props={props} productId={product._id} />        
        </div> 
      </div>
    </Layout>
  )
}

export default Product
