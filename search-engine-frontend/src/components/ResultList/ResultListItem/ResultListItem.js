import React from 'react'
import axios from 'axios'
import Server from '../../../resources/sources'

import './ResultListItem.css'

const ResultListItem = (props) => {
  const updateHitCount = () => {
    axios
      .put(Server.baseURL + '/links/update-hits', {
        id: props.id 
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  } 

  return (
    <div className='ListItem'>
      <a href={ props.address } target="_blank" rel='noopener noreferrer' onClick={ updateHitCount }><h3> { props.name } </h3></a>
      <h6  className='FakeLink'> { props.address } </h6>
      <p> { props.desc } </p>
      <hr />
    </div>
  )
}

export default ResultListItem