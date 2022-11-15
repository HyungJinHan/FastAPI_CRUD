import React from 'react';
import { AppBar, Toolbar, Button, Box, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login(props) {
  // const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    if ((name === '') && (password === '')) {
      return;
    } else {
      window.sessionStorage.setItem('id', name)
      axios
        .post('http://localhost:8000/login', {
          name: name,
          password: password
        })
        .then((response) => {
          if (response.data.name === window.sessionStorage.getItem('id')) {
            navigate("/main");
          } else {
            window.sessionStorage.clear();
            alert('등록된 회원이 아닙니다.')
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
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
          <TextField type="hidden" />
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
                    onChange={
                      (e) => setName(e.target.value)
                    }
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          login();
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
                    onChange={
                      (e) => setPassword(e.target.value)
                    }
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          login();
                        }
                      }
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => login()} variant="contained" color="primary">
                    Login
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

export default Login;