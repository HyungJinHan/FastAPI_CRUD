import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function FirstPage(props) {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => { navigate('/login') }}>Login</Button>
          <Button color="inherit" onClick={() => { navigate('/join') }}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default FirstPage;