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
    
    
    
    const path = window.location.pathname
    const match = path.match(/(?<chatid>\d+)/)
    const urlChatId = match ? match.groups.chatid : -1

    const isDetail = `${chat.id}` === `${urlChatId}`

    const handlePerformAction = (newActionChat, status) => {
        if (status === 200){
            setActionChat(newActionChat)
        } else if (status === 201) {
            if (didRepost) {
                didRepost(newActionChat)
            }
        }
        
    }
    
    const handleClick = (event) => {
        event.preventDefault()
        window.location.href = `/${chat.id}`
    }

    return <div className={className}>
        <div>
            <ParentChat chat={chat}/>
           <p>{chat.id} - {chat.content}</p> 
           
        </div>        
      <div className='btn btn-group'>
        {(actionChat && hideActions !== true) && <React.Fragment>
        <ActionBtn chat={actionChat} didPerformAction={handlePerformAction} action={{type: "like", display: "Likes"}}/>
        <ActionBtn chat={actionChat} didPerformAction={handlePerformAction} action={{type: "unlike", display: "Unlike"}}/>
        <ActionBtn chat={actionChat} didPerformAction={handlePerformAction} action={{type: "repost", display: "Repost"}}/>   
        </React.Fragment>}
        {isDetail === true ? null : <button className="btn btn-outline-primary btn-sm" onClick={handleClick}> View </button>}
      </div>
      
    </div>
}