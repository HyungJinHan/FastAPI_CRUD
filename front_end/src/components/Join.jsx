import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join(props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const JoinUser = async () => {
    await axios.post(`http://localhost:8000/`, user)
    navigate('/login');
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Sign up</Button>
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
                          JoinUser();
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
                          JoinUser();
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
                          JoinUser();
                        }
                      }
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={
                    () => {
                      JoinUser()
                      navigate('/login')
                    }
                  } variant="contained" color="primary">
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Join;