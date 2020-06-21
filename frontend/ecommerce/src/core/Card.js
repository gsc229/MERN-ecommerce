import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Image from './ShowImage'
import moment from 'moment'
import {addItem, updateItem, removeItem} from './cartHelpers'

const Card = ({
  props,
  product, 
  viewProductButton = true, 
  viewAddToCartButton = true, 
  cartUpdate=false, 
  removeProductButton=false,
  setRefresh,
  refresh
}) => {
  console.log('CARD PROPS: ', props)
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  console.log(redirect)
  const showViewButton = (showButton) => {
    return(showButton &&
    <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
    </Link>)
  }

  const addToCart = () => {
    addItem(product, ()=>{
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect => {
    if(redirect){
      return <Redirect to={props.match.path} />
    }
  }

  const showAddToCartButton = (showButton) => (
    (showButton && <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
      Add to Cart
    </button>)
  )

  const showRemoveButton = (showButton) => (
    showButton && <button 
    onClick={()=>{
      removeItem(product._id)
      setRefresh(!refresh)
      
    }} 
    className='btn btn-outline-danger mt-2 mb-2'>Remove Item</button>
  )


  const showStock = (quantity) => {
  return (quantity > 0 ? <span className='badge badge-primary badge-pill' >{`${quantity} In Stock`}</span> 
    : 
    <span className='badge badge-primary badge-pill' >Out of Stock</span>)
  }


  const handleChange = (productId) => event => {
    setCount(event.target.value < 1 ? 1 :event.target.value)
    if(event.target.value >= 1){
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = (on) => {
    return on &&
     <div className='input-group mb-3'>
       <div className="input-group-prepend">
         <span className="input-group-text">Adjust Quantity</span>
       </div>
       <input type="number" value={count} className="form-control" onChange={handleChange(product._id)}/>
    </div>
  }

  return (
    
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
        {shouldRedirect(redirect)}
        <Image item={product} url='product' />
        <p className='lead mt-2'>{product.description.substring(0, 100)}...</p>
        <p className='black-10'>${product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br/>
        {showViewButton(viewProductButton)}
        {showRemoveButton(removeProductButton)}       
        {showAddToCartButton(viewAddToCartButton)}
        {showCartUpdateOptions(cartUpdate)}        
        </div>
      </div>
    
  )
}

export default Card
