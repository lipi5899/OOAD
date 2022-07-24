import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Popconfirm, Table } from 'antd'
import axios from 'axios'

import Server from  '../../../resources/sources'
import './Dashboard.css'
import * as dataColumns from './columns'
import * as queryColumns from './columnsQuery'
import { Button } from 'react-bootstrap'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [ results, setResults ] = useState([])
  const [ queries, setQueries ] = useState([])
  const [ mode, setMode ] = useState("url")

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
  const queryClmns = [ queryColumns.title, queryColumns.hits ]  

  const handleDelete = (record) => {
    axios
      .put(Server.baseURL + '/links/delete/', { id: record._id })
      .then((res) => updateLinks(record._id))
      .catch((err) => console.log(err))
  }

  const updateLinks = (id) => {
    const newResults = results.filter((result) => result._id !== id)
    setResults(newResults)
  }

  useEffect(() => {
    axios
      .get(Server.baseURL + '/links')
      .then(res => {
          setResults(res.data)
      })
      .catch(err => console.log(err))

    axios
      .get(Server.baseURL + '/links/queries')
      .then((res => setQueries(res.data)))
      .catch(err => console.log(err))
  }, [])
  
  const logout = () => {
    navigate('/', { replace: true })
  }

  const expandableRow = (record) => (
    <p style={{ margin: 0 }}> {record.description} </p>
  )
  
  const switchMode = () => {
    if(mode ===  "url") {
      setMode("query")
    } else {
      setMode("url")
    }
  }

  const urlTable = (
    <Table 
      columns ={ columns } 
      dataSource ={ results }
      expandable = {{
        expandedRowRender: expandableRow,
        rowExpandable: (record) => record.link_name !== 'Not Expandable',
      }}
      rowKey = "_id"
      pagination = {{ position: ["topRight", "bottomRight"] }}
      bordered
      title={() => <h2>URL List</h2>}
    />
  )

  const queryTable = (
    <Table 
      columns = { queryClmns }
      dataSource = { queries }
      rowKey = { "_id" }
      pagination = {{ position: ["topRight", "bottomRight"] }}
      bordered
      title={() => <h2>Query List</h2>}
    />
  )

  return (
    <div className='w-100'>
      <div className='TopBar'>
        <span>{ location.state.username }'s Dashboard</span>
        <div>
          <span style={{ cursor: 'pointer', marginRight: '20px' }} onClick={ switchMode }>{ mode === "url" ? "Query List" : "URL List" }</span>
          <span style={{ cursor: 'pointer' }} onClick={ logout }>Logout</span>
        </div>
      </div>
      <div className='Content'>
        { mode === "url" ? urlTable : queryTable }   
      </div>
    </div>
  )
}

export default Dashboard
