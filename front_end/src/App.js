import {
  AppBar,
  Toolbar,
  Button,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/')
    return setUsers(response.data)
  }

  fetchUsers()

  const fetchUser = async (id) => {
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }

  const createOrEditUser = async (id) => {
    if (user.id) {
      await axios.put(`http://localhost:8000/${id}`, user)
    } else {
      await axios.put(`http://localhost:8000/`, user)
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
          <Button color="inherit">users</Button>
        </Toolbar>
      </AppBar>
      <Box m={10}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField onChange={(e) => setUser({ ...user, name: e.target.value })} id="standard-basic" label="Name" />
                </TableCell>
                <TableCell>
                  <TextField onChange={(e) => setUser({ ...user, email: e.target.value })} id="standard-basic" label="Email" />
                </TableCell>
                <TableCell>
                  <TextField onChange={(e) => setUser({ ...user, name: e.target.password })} id="standard-basic" label="Password" />
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
                    <Button variant="contained">Default</Button>
                    <Button onClick={() => fetchUser(row.id)} variant="contained" color="primary">
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">Default</Button>
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

export default App;
