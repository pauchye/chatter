import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'
import {ActionBtn} from './buttons'


export function ParentChat(props) {
    const {chat} = props
    return chat.parent ? <div className='row'> 
                <div className='col-11 mx-auto p-3 border rounded'>
                    <p className='mb-0 text-muted small'>Reposted</p>
                    <Chat hideActions className='' chat={chat.parent}/>
                </div>
            </div> : null
}


export function Chat(props) {
    const {chat, didRepost, hideActions} = props
    
    const [ actionChat, setActionChat ] = useState(chat ? chat : null)
    const className = props.className || 'col-10 mx-auto col-md-6'
    
    const handlePerformAction = (newActionChat, status) => {
        if (status === 200){
            setActionChat(newActionChat)
        } else if (status === 201) {
            if (didRepost) {
                didRepost(newActionChat)
            }
        }
        
    }
    
    return <div className={className}>
        <div>
            <ParentChat chat={chat}/>
           <p>{chat.id} - {chat.content}</p> 
           
        </div>        
      {(actionChat && hideActions !== true) && <div className='btn btn-group'>
        <ActionBtn chat={actionChat} didPerformAction={handlePerformAction} action={{type: "like", display: "Likes"}}/>
        <ActionBtn chat={actionChat} didPerformAction={handlePerformAction} action={{type: "unlike", display: "Unlike"}}/>
        <ActionBtn chat={actionChat} didPerformAction={handlePerformAction} action={{type: "repost", display: "Repost"}}/>   
      </div>
      }
    </div>
}