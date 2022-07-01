import React from 'react'
import { useNavigate } from 'react-router';
import { Container, Form, Button } from 'react-bootstrap'
import { message } from 'antd';
import axios from 'axios'

import Server from  '../../../resources/sources'
import './Login.css'
import Logo from '../../../assests/logo4.png'


const Login = () => {
  const navigate = useNavigate()
  const error = () => {
    message.error('Invalid Credentials. Try again.');
  };

  const onLogoClick = () => {
    navigate("/", { replace: true })
  }

  const formHandler = (event) => {
    event.preventDefault()

    const data = {
      username: event.target[0].value,
      password: event.target[1].value
    }

    axios
      .post(Server.baseURL + '/admins/login', data)
      .then((res) => {
        console.log(res)
        if(res.data.status === "ok") {
          navigate("/admin-dash", { replace: true, state: { username: res.data.username } })
        } else {
          error()
        }
      })
      .catch((err) => console.log(err))   
  }

  return (
    <Container fluid className='PageContainer'>
      <div className="FormContainer d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-3" onSubmit={ formHandler }>
          <div className='LogoContainer'>
            <img src={ Logo } alt="Logo" className="LogoLogin" onClick={ onLogoClick } />
          </div>
          <h3 style={{ textAlign: 'center', marginBottom: '30px', textDecoration: 'underline' }}>Administrator Login</h3>  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control className='InputLogin' type="username" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className='InputLogin' type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="danger" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default Login