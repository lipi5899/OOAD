import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Input } from 'antd';
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

    const goToAdminLogin = (event) => {
        navigate("/admin-login", { replace: true  })
    }

    return (
        <>
            <div className='AdminLink'>
                <p className='Link' onClick={ goToAdminLogin }>Admin Login</p>
            </div>
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
                        variant='outline-primary' 
                        onClick={ onSearchClick }
                        size="lg" className='ButtonHome'>
                            Search
                    </Button>
                </div>
            </Container>
        </>
    )
}

export default Home