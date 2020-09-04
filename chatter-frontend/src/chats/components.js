import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'
import {ActionBtn} from './buttons'
import {ChatList} from './list'
import {ChatForm} from './chatform'
import {apiChatDetail} from './lookup'

export function ChatsComponents(props){

    const [newChats, setNewChats] = useState([])
    const canPost = props.canPost === "false" ? false : true
    const handleNewChatPost = (newChatPost) => {
        let tempChat = [...newChats]
        tempChat.unshift(newChatPost)
        setNewChats(tempChat)
    }

    return (
        <div className={props.className}>
            { canPost === true && <ChatForm didPost={handleNewChatPost} className="col-12 mb-3"/>}
            <ChatList newChats={newChats} {...props}/>
        </div>
    )
}

export function ChatsDetail(props){
    
}