// Giovani Bergamasco
// 11/17/2024
// IT 302 451
// Phase 4 Read Node.js Data using React.js
// glb7@njit.edu
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login({ loginSetter }) {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [user, setUser] = useState(null);
  useEffect(() => {
    loginSetter(user);
  }, [loginSetter, user]);
  const onChangeName = e => {
    const name = e.target.value
    setName(name);
  }
  const onChangeId = e => {
    const id = e.target.value
    setId(id);
  }
  const handleSubmit = () => {
    setUser({ name: name, id: id })
  }
  return (
    <div>
      {user == null ? (
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={onChangeName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter id"
              value={id}
              onChange={onChangeId}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      ) : (
        <p>{name} ({id}) logged in successful.</p>
      )}
    </div>
  )
}
export default Login;
