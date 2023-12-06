import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  console.log("\ndoctor@pets.com Pet1234");
  console.log("owner1@test.com qwerty");
  console.log("owner2@woof.net Bark!");
  console.log("owner3@abc.org _Dog2023\n");

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function fetchRes(email, password) {
    fetch("https://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(response.status + " Invalid email or password");
          }
          throw new Error("Failed to login: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful. Access Token:", data.access_token);
        // Reset form fields on successful login
        emailRef.current.value = "";
        passwordRef.current.value = "";
        // navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await fetchRes(emailRef.current.value, passwordRef.current.value);
      //navigate('/')
    } catch (error) {
      setError("Failed to log in: " + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
