import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap' 
import { Button, Input } from 'antd';   
import { useLocation, useNavigate } from 'react-router';

import ResultList from '../../components/ResultList/ResultList';
import Pagination from '../../components/Pagination/Pagination'
import "./SearchResult.css"
import Logo from '../../assests/logo4.png'
import axios from 'axios'
import Server from  '../../resources/sources'
import TopMenu from '../../components/TopMenu/TopMenu';

const SearchResult = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [ search, setSearch ] = useState(location.state.val)
    const [ resultsPerPage, setResultsPerPage] = useState(5)
    const [ results, setResults ] = useState([])
    const [ defaultResults, setDefaultResults ] = useState([])
    const [ currentResults, setCurrentResults ] = useState([])
    const [ areResultsEmpty, setAreResultsEmpty ] = useState(false)
    const [ sortMode, setSortMode ] = useState("")

    useEffect(() => {
        axios
            .get(Server.baseURL + '/links')
            .then(res => {
                checkIfNull(res.data)
            })
            .catch(err => console.log(err))
    }, [location])    

    useEffect(() => {
      sortResults(results)
    }, [sortMode])
    

    const onSearchClick = () => {
        axios
            .get(Server.baseURL + '/links')
            .then(res => {
                checkIfNull(res.data)  
            })
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

    const changeSortMode = (event) => {
        setSortMode(event.target.value)
    }

    const checkIfNull = (result) => {
        if(result.length === 0) {
            setAreResultsEmpty(true)
        } else {
            sortResults(result)
        }       
    }

    const sortResults = (result) => {
        switch(sortMode) {
            case "alphabetical":
                setDefaultResults([...result])
                result.sort((a,b) => a.link_name.localeCompare(b.link_name))
                setResults([...result])
                break;
            case "popular":
                break;
            case "default":
                setResults(defaultResults)
                break;
            default:
                setResults(result)
                break;
        } 
    }

    const ListContainer = (
        <div className='ListContainer'>
            <TopMenu 
                changeNoOfResults = { changeNoOfResults }
                changeSortMode = { changeSortMode } />

            <ResultList links = { currentResults }/>
            <Pagination 
                resultsPerPage = { resultsPerPage } 
                results = { results } 
                setCurrentResults = { setCurrentResults } />
        </div>
    )

    const EmptyContainer = (
        <div className='EmptyContainer'>
            <h5 className='text-muted'>No results found</h5>
        </div>
    )
 
    return (
        <Container fluid className='SearchPage'>
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

            <div style={{ padding: '20px 60px' }}> <hr /></div>
            
            {  !areResultsEmpty ? ListContainer : EmptyContainer  }
        </Container>
    )
}

export default SearchResult