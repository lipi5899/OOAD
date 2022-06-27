import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import './Pagination.css'

const Pagination = ({ resultsPerPage, results, setCurrentResults }) => {
    const [ pageCount, setPageCount ] = useState(0);
    const [ resultOffset, setResultOffset] = useState(0);

    useEffect(() => {
        const endOffset = resultOffset + resultsPerPage;
        setCurrentResults(results.slice(resultOffset, endOffset));
        setPageCount(Math.ceil(results.length / resultsPerPage));
      }, [resultOffset, resultsPerPage, results, setCurrentResults]);
    
      const handlePageClick = (event) => {
        const newOffset = (event.selected * resultsPerPage) % results.length;
        setResultOffset(newOffset);
      };

    return (
        <div style={{ textAlign: 'center', marginTop: '70px' }}>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                pageLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"} />
        </div>
    )
}

export default Pagination