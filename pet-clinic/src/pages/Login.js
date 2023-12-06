import React, { useEffect, useRef } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';

export default function Login() {
  const { login, error, fetchingData, token } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  useEffect( () => {
    if (token) {
      navigate('/')
    }
      
  }, [ [], token ])

  const handleSubmit = (e) => {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={"doctor@pets.com"} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required defaultValue={"Pet1234"}/>
            </Form.Group>
            <Button disabled={fetchingData} className="w-100 mt-4" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}