import { lookup } from '../lookup'

export function apiChatList(callback) {
    lookup("GET", "chats", callback)
}

export function apiCreateChats(newChat, callback) {
    lookup("POST", "chats/create", callback, {content: newChat})
}

export function apiChatAction(chatId, action, callback) {
    lookup("POST", "chats/action", callback, {id: chatId, action: action})
}