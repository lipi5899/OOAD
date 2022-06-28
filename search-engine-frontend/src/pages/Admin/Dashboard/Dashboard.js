import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Popconfirm, Table } from 'antd'
import axios from 'axios'

import Server from  '../../../resources/sources'
import './Dashboard.css'
import * as dataColumns from './columns'
import { Button } from 'react-bootstrap'

const Dashboard = () => {
  const navigate = useNavigate()
  const [ results, setResults ] = useState([])

  const actions = {
    title: "Actions",
    dataIndex: '',
    render: (record) => (
      <Popconfirm title="Are you sure?" onConfirm={ () => handleDelete(record) }>
        <Button variant="danger" size="sm">Delete</Button>
      </Popconfirm>
    )
  }

  const columns = [ dataColumns.title, dataColumns.url, dataColumns.hits, dataColumns.health, actions] 

  const handleDelete = (record) => {
    //Dummy logic
    console.log(record)

    //Send request to backend
  }

  useEffect(() => {
    axios
      .get(Server.baseURL + '/links')
      .then(res => {
          setResults(res.data)
          console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  
  
  const logout = () => {
    navigate('/', { replace: true })
  }

  const expandableRow = (record) => (
    <p style={{ margin: 0 }}> {record.description} </p>
  )

  return (
    <div className='w-100'>
      <div className='TopBar'>
        <span>Admin Dashboard</span>
        <span style={{ cursor: 'pointer' }} onClick={ logout }>Logout</span>
      </div>
      <div className='Content'>
        <Table 
          columns ={ columns } 
          dataSource ={ results }
          expandable = {{
            expandedRowRender: expandableRow,
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          rowKey = "_id"
          pagination = {{ position: ["topRight", "bottomRight"] }}
          bordered = "true"
          title={() => <h2>URL List</h2>}
       />
      </div>
    </div>
  )
}

export default Dashboard
