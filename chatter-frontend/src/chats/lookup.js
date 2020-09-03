import { lookup } from '../lookup'

export function apiChatList(username,callback) {
    let endpoint = "chats"
    if (username){
        endpoint = `chats?username=${username}`
    }
    lookup("GET", endpoint, callback)
}

export function apiChatDetail(chatId, callback) {
    let endpoint = `chats/${chatId}`    
    lookup("GET", endpoint, callback)
}

export function apiCreateChats(newChat, callback) {
    lookup("POST", "chats/create", callback, {content: newChat})
}

export function apiChatAction(chatId, action, callback) {
    lookup("POST", "chats/action", callback, {id: chatId, action: action})
}