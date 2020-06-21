import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {getBraintreeClientToken} from './apiCore'
import DropIn from 'braintree-web-drop-in-react'




const Checkout = ({products}) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue)=>{
      return currentValue + nextValue.count * nextValue.price
    },0)
  }

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })

  const userId = isAuthenticated() && isAuthenticated().user._id

  const getToken = (id) => {
    getBraintreeClientToken(id)
    .then(data=>{
      if(data.error){
        setData({...data, error: data.error})
      } else{
        //console.log('Checkout.js getToken clientToken data: ', data)
        setData({...data, clientToken: data.clientToken})
      }
    })
  }
  //console.log(data.clientToken)
  useEffect(()=>{
    getToken(userId)
  }, [])

  const showCheckout = () => {
    return (
    isAuthenticated() ? <div>{showDropIn()}</div>
        : <Link to='signin'>
          <button className='btn btn-primary'>Sign in to checkout</button>
          </Link>
    )
  }


  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn 
          options={{
            authorization: data.clientToken
          }} 
          onInstance={instance => {return instance=instance} }
          />
          <button className="btn btn-success">Checkout</button>
        </div>
      ) : null}
    </div>
  )

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  )
}

export default Checkout
