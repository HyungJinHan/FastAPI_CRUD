import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import Join from './components/Join';
import Login from './components/Login';
import Main from './components/Main';

function App() {


  return (
    <Routes>
      <Route path='/' element={<FirstPage />} />
      <Route path='/join' element={<Join />} />
      <Route path='/login' element={<Login />} />
      <Route path='/main' element={<Main />} />
    </Routes>
  );
}

export default App;
