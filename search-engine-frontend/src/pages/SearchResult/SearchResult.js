import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Input } from 'antd';   
import { useNavigate } from 'react-router';
import ResultList from '../../components/ResultList/ResultList';

const SearchResult = (props) => {
    const [ search, setSearch ] = useState('')
    const navigate = useNavigate()

    const onSearchClick = () => {
        navigate("/result", { replace: true })
    }

    const textValueChange = (event) => {
        setSearch(event.target.value)
    }  
    return (
    <div className={ Container }>
        <p>Logo</p>
        <Input placeholder='Search Here' value={ search } onChange={ textValueChange } />
        <Button type="primary" onClick={ onSearchClick }>Search</Button>
        <ResultList />
    </div>
    )
}

export default SearchResult