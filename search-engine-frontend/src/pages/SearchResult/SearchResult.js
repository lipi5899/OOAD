import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Input } from 'antd';   
import ResultList from '../../components/ResultList/ResultList';
import { useLocation } from 'react-router';
import "./SearchResult.css"
import Logo from '../../assests/logo1.png'

const SearchResult = (props) => {
    const location = useLocation()
    const [ search, setSearch ] = useState(location.state.val)

    useEffect(() => {
      console.log("Send request to backend")
    }, [location])

    const onSearchClick = () => {
        console.log("Send request to backend") 
    }

    const textValueChange = (event) => {
        setSearch(event.target.value)
    }  
    return (
    <Container fluid>
        <div className='SearchTop'>
            <img src={ Logo } alt="Logo" className="Logo" />
            <Input 
                placeholder='Search Here' 
                value={ search } 
                onChange={ textValueChange } 
                className="Input"/>
        
            <Button 
                type="primary" 
                onClick={ onSearchClick }
                
                >Search</Button>
        </div>

        <ResultList />
    </Container>
    )
}

export default SearchResult