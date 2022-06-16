import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router';

import './Home.css'
import Logo from '../../assests/logo1.png'

const Home = () => {
    const [ search, setSearch ] = useState('')
    const navigate = useNavigate()

    const onSearchClick = () => {
        navigate("/result", { replace: true, state: { val: search }})
    }

    const textValueChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <Container className='Home'>
            <div className='LogoContainer'>
                <img src={ Logo } alt="Logo" className="LogoHome" />
            </div>
            
            <div className='LogoContainer'>
                <Input 
                    placeholder='Search Here' 
                    value={ search } 
                    onChange={ textValueChange } 
                    className="Input" />
            </div>

            <div className='ButtonContainer my-2'>
               <Button 
                    type="primary" 
                    onClick={ onSearchClick }
                    size="large">
                        Search
                </Button>
            </div>
        </Container>
    )
}

export default Home