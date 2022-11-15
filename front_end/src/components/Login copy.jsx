import React from 'react';
import { AppBar, Toolbar, Button, Box, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios'

function Login(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/')
    return setUsers(response.data)
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUser = async (id) => {
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }

  const createOrEditUser = async () => {
    if (user.id) {
      await axios.put(`http://localhost:8000/${user.id}`, user)
    } else {
      await axios.post(`http://localhost:8000/`, user)
    }
    await fetchUsers()
    await setUser({
      id: 0,
      name: '',
      email: '',
      password: ''
    })
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/${id}`)
    await fetchUsers()
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box m={10}>
        <TableContainer>
          <TextField value={user.id} type="hidden" />
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    required="required"
                    autoComplete="off"
                    id="outline-basic"
                    variant="outlined"
                    label="Name"
                    value={user.name}
                    onChange={
                      (e) => setUser({
                        ...user,
                        name: e.target.value
                      })
                    }
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          createOrEditUser();
                        }
                      }
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required="required"
                    autoComplete="off"
                    id="outline-basic"
                    variant="outlined"
                    label="Email"
                    value={user.email}
                    onChange={
                      (e) => setUser({
                        ...user,
                        email: e.target.value
                      })
                    }
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          createOrEditUser();
                        }
                      }
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required="required"
                    autoComplete="off"
                    id="outline-basic"
                    variant="outlined"
                    label="Password"
                    type='password'
                    value={user.password}
                    onChange={
                      (e) => setUser({
                        ...user,
                        password: e.target.value
                      })
                    }
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          createOrEditUser();
                        }
                      }
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => createOrEditUser()} variant="contained" color="primary">
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>
                    <Button onClick={() => fetchUser(row.id)} variant="contained" color="primary">
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteUser(row.id)} variant="contained" color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </div>
  );
}

export default Login;