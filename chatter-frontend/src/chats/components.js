import React, {useEffect, useState}  from 'react'
import {apiCreateChats, apiChatList, apiChatAction} from './lookup'

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
            apiChatList(myCallback) 
        }
          
    }, [chatsInit, chatsDidSet, setChatsDidSet])

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

export function ChatsComponents(props){
    const textAreaRef = React.createRef()
    const [newChats, setNewChats] = useState([])
    
    const handleBackEndUpdate = (response, status) => {
        // backend api resp handler
        let tempChat = [...newChats]
        if (status === 201){
            tempChat.unshift(response)
            setNewChats(tempChat)
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
        <div className='col-12 mb-3'>
         <form onSubmit={handeSubmit} >
            <textarea ref={textAreaRef} required={true} className='form-control'></textarea>
            <button type='submit' className='btn btn-primary my-3'>Post</button>
        </form>   
        </div>
        <ChatList newChats={newChats}/>
        </div>
    )
}