import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'
import {ActionBtn} from './buttons'
import {ChatList} from './list'
import {ChatForm} from './chatform'
import {apiChatDetail} from './lookup'
import {Chat} from './chatitem'

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
    const {chatId} = props
    const [didLookup, setDidLookup] = useState(false)
    const [chat, setChat] = useState(null)
    const handleBackendLookup = (response, status) => {
        if (status === 200){
            setChat(response)
        } else {
            alert("There is no post")
        }
    }
    
    useEffect(() => {
        if (didLookup === false){
            apiChatDetail(chatId, handleBackendLookup)
            setDidLookup(true)
        }
    }, [chatId, didLookup, setDidLookup])

            
    return chat === null ? null : <Chat chat={chat} className={props.className}/>
}