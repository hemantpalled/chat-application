import { createContext, useReducer, useContext } from "react";
import chatReducer, { intialState } from '../reducers/ChatReducer'
import { CHAT_ACTIONS, USER_REGISTER_ACTION } from "../actions/UserChatActions";

const userChat = createContext(intialState)

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, intialState)


    const addUser = (user) => {

        dispatch({
            type: USER_REGISTER_ACTION.ADD_USER,
            payload: user
        })
    }
    const changeUser = (user) => {

        dispatch({
            type: CHAT_ACTIONS.CHANGE_USER,
            payload: user
        })

    }

    const changeReceiver = (user) => {

        let receiver = state.users.filter(item => {
            if (item.username !== user.username) {
                return item
            }
        })
        console.log(receiver);
        dispatch({
            type: CHAT_ACTIONS.CHANGE_RECEIVER,
            payload: receiver[0]
        })
    }

    const sendMessage = (sender, receiver, message) => {

        const updatedChats = { ...state.chats };

        if (updatedChats.hasOwnProperty(sender)) {
            updatedChats[sender].push({ id: updatedChats[sender].length + 1, sender, receiver, message, timestamp: new Date() });
        } else {
            updatedChats[sender] = [{ id: 1, sender, receiver, message, timestamp: new Date() }];
        }

        if (updatedChats.hasOwnProperty(receiver)) {
            updatedChats[receiver].push({ id: updatedChats[receiver].length + 1, sender, receiver, message, timestamp: new Date() });
        } else {
            updatedChats[receiver] = [{ id: 1, sender, receiver, message, timestamp: new Date() }];
        }

        dispatch({
            type: CHAT_ACTIONS.SEND_MESSAGE,
            payload: updatedChats
        })
    }
    console.log(state);
    const deleteMessage = (chat) => {

        const updatedChats = {...state.chats}
        updatedChats[state.activeUser.username] = updatedChats[state.activeUser.username].filter(item=>{
            if (item.id !== chat.id) {
                return item
            }
        })
        dispatch({
            type: CHAT_ACTIONS.DELETE_MESSAGE,
            payload: updatedChats
        })
    }
    const value = {
        'chats': state.chats,
        'users': state.users,
        'activeUser': state.activeUser,
        'receiver': state.receiver,
        sendMessage,
        addUser,
        changeUser,
        changeReceiver,
        deleteMessage,
        
    }

    return <userChat.Provider value={value}>{children}</userChat.Provider>
}

const useChatContext = () => {
    const context = useContext(userChat)
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider')
    }
    return context
}

export default useChatContext;

