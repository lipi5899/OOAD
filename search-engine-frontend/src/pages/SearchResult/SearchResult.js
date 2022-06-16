import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Input } from 'antd';   
import ResultList from '../../components/ResultList/ResultList';
import { useLocation } from 'react-router';
import "./SearchResult.css"
import Logo from '../../assests/logo1.png'
import axios from 'axios'
import Server from  '../../resources/sources'

const SearchResult = (props) => {
    const location = useLocation()
    const [ search, setSearch ] = useState(location.state.val)
    const [ results, setResults ] = useState([])

    useEffect(() => {
        axios
            .get(Server.baseURL + '/links')
            .then(res => {
                console.log(res.data)
                setResults(res.data)
            })
            .catch(err => console.log(err))
    }, [location])

    const onSearchClick = () => {
        axios
            .get(Server.baseURL + '/links')
            .then(res => setResults(res.data))
            .catch(err => console.log(err))
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
                className="Button">
                    Search
            </Button>
        </div>

        <div style={{ padding: '20px 60px' }}> <hr /></div>
        
        <div className='ListContainer'>
            <ResultList links = { results }/>
        </div>
        
    </Container>
    )
}

export default SearchResult