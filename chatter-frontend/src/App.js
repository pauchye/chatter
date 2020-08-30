import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ChatsComponents} from './chats/components'


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ChatsComponents/>
      </header>
    </div>
  );
}

export default App;
