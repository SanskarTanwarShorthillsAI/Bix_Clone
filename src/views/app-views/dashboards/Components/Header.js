import React from 'react'
import "./Header.css"

function Header(props) {
  return (
    <div className='header'>{props.title}</div>
  )
}

export default Header