import React, {useState, useEffect} from 'react'
import Card from './Card'
import {getProducts, getCategories} from './apiCore'


const Search = () => {

  const [data, setData]=useState({
    categories: [],
    category: '',
    search: '', 
    results: [],
    searched: false
  })

  const { categories, category, search, results, searched } = data

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error){
        console.log(data.error)
      } else{
        setData({...data, categories: data})
      }
    })
  }

  useEffect(()=>{
    loadCategories()
  },[])

  return (
    <div>
      <h2>Search Bar {JSON.stringify(data)}</h2>
    </div>
  )
}

export default Search
