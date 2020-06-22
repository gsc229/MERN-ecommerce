import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Image from './ShowImage'
import moment from 'moment'
import {addItem, updateItem, removeItem, checkForItemInCart, itemTotal} from './cartHelpers'

const Card = ({
  props,
  product,
  itemInCart=false,
  showViewProductButton = true, 
  addToCart_or_ChangeQtyRemoveBtns = true, 
  cartUpdate=false, 
  showRemoveProductButton=false,
  setRefresh=function(z){ console.log(z)},
  refresh=false
}) => {
  
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  
  const refreshRedirect = () => (props.history.push(props.match.url))   

  const addToCart = () => {
    addItem(product, ()=>{      
      refreshRedirect()
    })
    
    
  }

  const shouldRedirect = command => {
    if(command){
      return <Redirect to={props.match.path} />
    }
  }

  /* BUTTON - VIEW PRODUCT */
  const viewProductButton = (showButton) => {
    return(showButton &&
    <Link to={`/product/${product._id}`}>
      <button onClick={()=> setRefresh(!refresh)} className="btn btn-outline-primary mt-2 mb-2 mr-2">
        View Product
      </button>
    </Link>)
  }
  /* BUTTON - ADD TO CART  */
  const addToCartButton = (showButton) => {

    if(showButton){
      // if the item is in the cart, don't need add to cart, instead show
      if(itemInCart){
        return (
      <div>
        <h4>This item is in your cart</h4>
        {changeQuantityBar(true)}
        {/* reusing the remove button */}
        {removeProductButton(true, false)}
      </div>
      )
      } else{
        return (
          <button 
            onClick={addToCart} 
            className="btn btn-outline-warning mt-2 mb-2">
              Add to Cart
          </button>
          )
      }
    }
    /* showButton && 
    itemInCart ? 
      <div>
        <h4>This item is in your cart</h4>
        {changeQuantityBar(true)}
        {removeProductButton(true, false)}
      </div> : 
      <button 
      onClick={addToCart} 
      className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
      </button> */
  }
  /* BUTTON - REMOVE */
  const removeProductButton = (showButton, refreshPage=true) => (
    showButton && <button 
    onClick={()=>{
      removeItem(product._id)      
      refreshRedirect()
      if(refreshPage){
        setRefresh(!refresh)
      }      
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

  const changeQuantityBar = (on) => {
    return on &&
     <div className='input-group mb-3'>
       <div className="input-group-prepend">
         <span className="input-group-text">Adjust Quantity</span>
       </div>
       <input type="number" value={count ? count : 1} className="form-control" onChange={handleChange(product._id)}/>
     </div>
  }

  return (
    
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
        {shouldRedirect(redirect)}
        <h2>{product._id}</h2>
        <Image item={product} url='product' />
        <p className='lead mt-2'>{product.description.substring(0, 100)}...</p>
        <p className='black-10'>${product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br/>
        {viewProductButton(showViewProductButton)}
        {removeProductButton(showRemoveProductButton)}       
        {addToCartButton(addToCart_or_ChangeQtyRemoveBtns)}
        {changeQuantityBar(cartUpdate)}        
        </div>
      </div>
    
  )
}

export default Card
