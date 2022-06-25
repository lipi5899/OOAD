import React, { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap' 
import { Button, Input } from 'antd';   
import { useLocation, useNavigate } from 'react-router';

import ResultList from '../../components/ResultList/ResultList';
import Pagination from '../../components/Pagination/Pagination'
import "./SearchResult.css"
import Logo from '../../assests/logo1.png'
import axios from 'axios'
import Server from  '../../resources/sources'

const SearchResult = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [ search, setSearch ] = useState(location.state.val)
    const [ resultsPerPage, setResultsPerPage] = useState(5)
    const [ results, setResults ] = useState([])
    const [ currentResults, setCurrentResults ] = useState([])

    useEffect(() => {
        axios
            .get(Server.baseURL + '/links')
            .then(res => {
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

    const goHome = () => {
        navigate("/", { replace: true })
    }
    
    const changeNoOfResults = (event) => {
        setResultsPerPage(event.target.value)
    }
 
    return (
    <Container fluid>
        <div className='SearchTop'>
            <img src={ Logo } alt="Logo" className="Logo" onClick={ goHome } />
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
            <div className='ResultsPerPage'>
                <p> Search Results Per Page </p>
                <Form.Select aria-label="Select No of Results" onChange={ changeNoOfResults } className="SelectResults">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </Form.Select>
            </div>

            <ResultList links = { currentResults }/>
            <Pagination 
                resultsPerPage = { resultsPerPage } 
                results = { results } 
                setCurrentResults = { setCurrentResults } />
        </div>
        
    </Container>
    )
}

export default SearchResult