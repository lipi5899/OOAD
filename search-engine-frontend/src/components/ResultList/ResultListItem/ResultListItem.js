import React from 'react'
import './ResultListItem.css'

const ResultListItem = (props) => {
  return (
    <div className='ListItem'>
      <a href={ props.address } target="_blank" rel='noopener noreferrer'><h3> { props.name } </h3></a>
      <h6  className='FakeLink'> { props.address } </h6>
      <p> { props.desc } </p>
      <hr />
    </div>
  )
}

export default ResultListItem