import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

function Main(props) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("temitope");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Main;