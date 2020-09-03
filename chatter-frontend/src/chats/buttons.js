import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'

export function ActionBtn(props) {
    const {chat, action, didPerformAction} = props
    const likes = chat.likes ? chat.likes : 0
    // const [likes, setLikes] = useState(chat.likes ? chat.likes : 0)
    // const [clicked, setClick] = useState(false)
    const display = action.type === "like" ?`${likes} ${action.display}` : action.display
    const className = props.className || 'btn btn-primary btn-sm'
    // debugger
    const handleActionBackend = (response, status) => {
        console.log('s-r', response, status)
        if ((status === 200 || status === 201) && didPerformAction){
            // setLikes(response.likes)
            didPerformAction(response, status)
            // setClick(true)
        }
        // if (action.type === 'like') {
        //     if (clicked === true){
        //         setLikes(likes-1)
        //         setClick(false)
        //     } else {
        //         setLikes(chat.likes+1)
        //         setClick(true)
        //     }           
        // }
    }

    const handleClick = (event) => {
        event.preventDefault()
        apiChatAction(chat.id, action.type, handleActionBackend)

    }
    return <button className={className} onClick={handleClick}> {display} </button> 
}