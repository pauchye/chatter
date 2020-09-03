import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'
import {ActionBtn} from './buttons'
import {ChatList} from './list'

export function ChatForm(props){
        const textAreaRef = React.createRef()
        const {didPost} = props
        // const [newChats, setNewChats] = useState([])
        // const canPost = props.canPost === "false" ? false : true
        const handleBackEndUpdate = (response, status) => {
            // backend api resp handler
            // let tempChat = [...newChats]
            if (status === 201){
                // tempChat.unshift(response)
                didPost(response)
            } else {
                console.log(response)
                alert("An error occured. Please try again.")
            }
        }
    
        const handeSubmit = (e) => {
            e.preventDefault()
            const newVal = textAreaRef.current.value   
            // backend api req  
            apiCreateChats(newVal, handleBackEndUpdate)
            textAreaRef.current.value = ""
        }
        
    
        return (
            <div className={props.className}>
                    <form onSubmit={handeSubmit} >
                        <textarea ref={textAreaRef} required={true} className='form-control'></textarea>
                        <button type='submit' className='btn btn-primary my-3'>Post</button>
                    </form>   
            </div>
        )
}
