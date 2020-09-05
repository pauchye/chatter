import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChatsComponents, ChatsDetail} from './chats'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}
const e = React.createElement
const chatsEl = document.getElementById("chats-root")
if (chatsEl) {
    // console.log(chatsEl.dataset)
    const MyComponent = e(ChatsComponents, chatsEl.dataset)
    ReactDOM.render(MyComponent, chatsEl);
}

const chatDetailEl = document.querySelectorAll(".chat-root-detail")

chatDetailEl.forEach(cont => {
    ReactDOM.render(e(ChatsDetail, cont.dataset), cont);
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
