import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router';

const Home = (props) => {
    const [ search, setSearch ] = useState('')
    const navigate = useNavigate()

    const onSearchClick = () => {
        navigate("/Searchresult", { replace: true })
    }

    const textValueChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className={ Container }>
            <h1>Name of the app</h1>
            <Input placeholder='Search Here' value={ search } onChange={ textValueChange } />
            <Button type="primary" onClick={ onSearchClick }>Search</Button>
        </div>
    )
}

export default Home