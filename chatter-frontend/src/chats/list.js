import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'
import {Chat} from './chatitem'

export function ChatList(props) {
    const [ chatsInit, setChatsInit ] = useState([])
    const [ chats, setChats ] = useState([])
    const [ chatsDidSet, setChatsDidSet ] = useState(false)
    useEffect(() => {
        let final = [...props.newChats].concat(chatsInit)
        if (final.length !== chats.length){
            setChats(final)
        }
        
    }, [props.newChats, chats, chatsInit])
    useEffect(() => {
        if (chatsDidSet === false) {
            const myCallback = (response, status) => {
            if (status === 200){
                setChatsInit(response)
                setChatsDidSet(true)
            } else {
                alert("The was an error...")
            }     
            }
            apiChatList(props.username, myCallback) 
        }
          
    }, [chatsInit, chatsDidSet, setChatsDidSet, props.username])

    const handleDidRepost = (newChat) => {
        const updatedChatInit = [...chatsInit]
        updatedChatInit.unshift(newChat)
        setChatsInit(updatedChatInit)
        const updatedChatList = [...chats]
        updatedChatList.unshift(newChat)
        setChats(updatedChatList)
    }

    return (<div>

        {chats.map((chat, index)=>{
        return <Chat 
            didRepost={handleDidRepost}
            key={index} 
            chat={chat} 
            className="my-5 py-5 border bg-white text-dark"/>
        })}
    </div>
    )
}