import React, {useEffect, useState}  from 'react'
import {loadChats, createChats} from '../lookup'

export function Chat(props) {
    const {chat} = props
    const className = props.className || 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <p>
        {chat.id} - {chat.content}
      </p>
      <div className='btn btn-group'>
        <ActionBtn chat={chat} action={{type: "like", display: "Likes"}}/>
        <ActionBtn chat={chat} action={{type: "unlike", display: "Unlike"}}/>
        <ActionBtn chat={chat} action={{type: "repost", display: "Repost"}}/>
        {/* <LikeBtn chat={chat} action="like"/>
        <UnLikeBtn chat={chat} action="unlike"/>
        <RePostBtn chat={chat} action="repost"/> */}
      </div>
    </div>
}
  
export function ActionBtn(props) {
    const {chat, action} = props
    const [likes, setLikes] = useState(chat.likes ? chat.likes : 0)
    const [clicked, setClick] = useState(false)
    const display = action.type === "like" ?`${likes} ${action.display}` : action.display
    const className = props.className || 'btn btn-primary btn-sm'
    // debugger
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like') {
            if (clicked === true){
                setLikes(likes-1)
                setClick(false)
            } else {
                setLikes(chat.likes+1)
                setClick(true)
            }
            
        }
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
            loadChats(myCallback) 
        }
          
    }, [chatsInit, chatsDidSet, setChatsDidSet])

    return (<div>

        {chats.map((chat, index)=>{
        return <Chat key={index} chat={chat} className="my-5 py-5 border bg-white text-dark"/>
        })}
    </div>
    )
}

export function ChatsComponents(props){
    const textAreaRef = React.createRef()
    const [newChats, setNewChats] = useState([])
    const handeSubmit = (e) => {
        e.preventDefault()
        const newVal = textAreaRef.current.value
        let tempChat = [...newChats]
        createChats(newVal, (response, status) => {
            if (status === 201){
                // tempChat.unshift({
                //     content: newVal,
                //     likes: 0,
                //     id: 123
                // }) 
                tempChat.unshift(response)
            } else {
                console.log(response)
                alert("An error occured. Please try again.")
            }
            
        })
        
        setNewChats(tempChat)
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