import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'    
import { useLocation, useNavigate } from 'react-router';

import "./SearchResult.css"
import axios from 'axios'
import Server from  '../../resources/sources'

import * as helper from './HelperFunctions'
import SearchTop from '../../components/SearchResult/SearchTop/SearchTop';
import EmptyContainer from '../../components/SearchResult/EmptyContainer/EmptyContainer';
import ListContainer from '../../components/SearchResult/ListContainer/ListContainer';

const SearchResult = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    const [ results, setResults ] = useState([])
    const [ defaultResults, setDefaultResults ] = useState([])
    const [ currentResults, setCurrentResults ] = useState([])
    const [ search, setSearch ] = useState(location.state.val)
    const [ resultsPerPage, setResultsPerPage] = useState(5)
    const [ areResultsEmpty, setAreResultsEmpty ] = useState(false)
    const [ sortMode, setSortMode ] = useState("") 

    useEffect(() => {
        searchFor(location.state.val)
            // eslint-disable-next-line
    }, [location.state.val])    

    useEffect(() => {
      sortResults(results)
      // eslint-disable-next-line
    }, [sortMode])

    const searchFor = (queryString) => {
        const filteredString = helper.filterQuery(queryString)
        const endpoint = helper.selectRequestAPI(filteredString)
        const data = helper.parseData(filteredString, endpoint)

        axios
            .post(Server.baseURL + '/links/search' + endpoint, data)                                                                                                                                                                                                                                                                                                                                                                                
            .then(res => checkIfNull(res.data))  
            .catch(err => console.log(err))
    }

    const checkIfNull = (result) => {
        if(result.length === 0) {
            setAreResultsEmpty(true)
        } else {
            setAreResultsEmpty(false)
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
                result.sort((a,b) => a.hits - b.hits > 0 ? -1 : 1)
                setResults([...result])
                break;
            case "default":
                setResults(defaultResults)
                break;
            default:
                setResults(result)
                break;
        } 
    }

    const onSearchClick = () => searchFor(search)
    const textValueChange = (event) => setSearch(event.target.value)
    const changeNoOfResults = (event) => setResultsPerPage(event.target.value)
    const changeSortMode = (event) => setSortMode(event.target.value)
    const goHome = () => navigate("/", { replace: true })
        
    return (
        <Container fluid className='SearchPage'>
            <SearchTop 
                onSearchClick={ onSearchClick }
                search = { search }
                goHome = { goHome }
                textValueChange = { textValueChange } />

            <div style={{ padding: '20px 60px' }}> <hr /></div>
            
            {  
                !areResultsEmpty 
                ?  <ListContainer 
                        changeNoOfResults =  { changeNoOfResults }
                        changeSortMode = { changeSortMode }
                        currentResults = { currentResults }
                        resultsPerPage = { resultsPerPage }
                        results = { results }
                        setCurrentResults = { setCurrentResults } />
                : <EmptyContainer />  
            }
        </Container>
    )
}

export default SearchResult