import React from 'react'
import Pagination from '../../Pagination/Pagination'
import ResultList from '../../ResultList/ResultList'
import TopMenu from '../../TopMenu/TopMenu'

const ListContainer = ({ changeNoOfResults, changeSortMode, currentResults, resultsPerPage, results, setCurrentResults }) => {
  return (
    <div style={{ padding: '30px 120px' }}>
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
}

export default ListContainer