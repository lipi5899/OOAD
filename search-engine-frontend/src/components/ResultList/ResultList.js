import React from 'react'
import ResultListItem from './ResultListItem/ResultListItem'

const ResultList = (props) => {
  return (
    <div style={{ marginTop: '10px' }}>
      {
        props.links.map((element) => {
          return <ResultListItem 
                    key={ element._id }
                    name={ element.link_name }
                    address={ element.link_address }
                    desc={ element.description } />
          })
      }
    </div>
  )
}

export default ResultList
