import React from 'react'
import { Form } from 'react-bootstrap'

import './TopMenu.css'

const TopMenu = ({ changeNoOfResults, changeSortMode }) => {
  return (
        <div className=''>
            <div className='SortMode'>
                <p> Sort Mode </p>
                <Form.Select 
                    aria-label="Sort Mode" 
                    onChange={ changeSortMode } 
                    className="SelectMode"
                    defaultValue="none">
                        <option value="default">Default</option>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="popular">Popular</option>
                </Form.Select>
            </div>
            <div className='ResultsPerPage'>
                <p> Search Results Per Page </p>
                <Form.Select 
                    aria-label="Select No of Results" 
                    onChange={ changeNoOfResults } 
                    className="SelectResults">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                </Form.Select>
            </div>
        </div>
  )
}

export default TopMenu