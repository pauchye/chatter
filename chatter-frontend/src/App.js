import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const loadChats = function(callback) {
  const xhr = new XMLHttpRequest()
  const method = "GET";
  const url = "http://localhost:8000/api/chats";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  // xhr.onload = function(e) {
    // callback({"message": "There was an error"})
  // }

  xhr.send()
  
  // console.log("hi from home.html 2")
}

function App() {
  const [ chats, setChats ] = useState([])

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200){
        setChats(response)
      } else {
        alert("The was an error...")
      }     
    }
    loadChats(myCallback)   
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
        {chats.map((chat, index)=>{
            return <li key={index}>{chat.content}</li>
          })}
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
