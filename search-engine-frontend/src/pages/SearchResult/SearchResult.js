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
    
    const selectRequestAPI = (value) =>  {
        const valueArray = value.split(" ")
        const valueArrayLowerCase = valueArray.map(val => val.toLowerCase())

        if(valueArrayLowerCase.includes("and")) {
            return "-AND"
        } else if(valueArrayLowerCase.includes("or")) {
            return "-OR"
        } else if(valueArrayLowerCase.includes("not")) {
            return "-NOT"
        } else {
            return ""
        }
    }

    const parseData = (string, endpoint) => {
        return { queryString: string }
    }

    const searchFor = (queryString) => {
        const endpoint = selectRequestAPI(queryString)
        const data = parseData(queryString, endpoint)

        axios
            .post(Server.baseURL + '/links/search' + endpoint, data)                                                                                                                                                                                                                                                                                                                                                                                
            .then(res => checkIfNull(res.data))  
            .catch(err => console.log(err))
    }

    const checkIfNull = (result) => {
        console.log(result)
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
    const goHome = () => navigate("/", { replace: true })
    const changeNoOfResults = (event) => setResultsPerPage(event.target.value)
    const changeSortMode = (event) => setSortMode(event.target.value)
                    
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