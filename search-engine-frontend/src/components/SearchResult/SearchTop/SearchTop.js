import React from 'react'
import { Input, Button } from 'antd'
import './SearchTop.css'
import Logo from '../../../assests/logo4.png'

const SearchTop = ({ textValueChange, onSearchClick, goHome, search }) => {
  return (
    <div className='SearchTop'>
        <img src={ Logo } alt="Logo" className="Logo" onClick={ goHome } />
        <Input 
            placeholder='Search Here' 
            value={ search } 
            onChange={ textValueChange } 
            className="Input"/>
    
        <Button 
            type="danger" 
            onClick={ onSearchClick }
            className="Button">
                Search
        </Button>
    </div>
  )
}

export default SearchTop