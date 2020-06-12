import React from 'react'


const Layout = ({
  title = 'Title', 
  description='Description', 
  children,
  className,
  ...props

}) => {
  console.log('Layout props ', props)
  return (
    <div className="jumbotron">
      <div>
        <h2>{title}</h2>
        <p className='lead'>{description}</p>
      </div>
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

export default Layout


