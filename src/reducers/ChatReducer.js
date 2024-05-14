import { CHAT_ACTIONS, USER_REGISTER_ACTION } from "../actions/UserChatActions";

export const intialState = {
    users: [{
        name: "Vishal",
        username: "vishal"
    },
    {
        name: "Hemant",
        username: "hemant"
    }
    ],
    chats: {},
    activeUser: {
        name: "Hemant",
        username: "hemant"
    },
    receiver: {
        name: "Vishal",
        username: "vishal"
    },
}

const chatReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_REGISTER_ACTION.ADD_USER:
            return {
                ...state,
                users: [...state.users, payload]
            }
        case CHAT_ACTIONS.SEND_MESSAGE:
            return {
                ...state,
                chats: payload
            }
        case CHAT_ACTIONS.CHANGE_USER:
            return {
                ...state,
                activeUser: payload
            }
        case CHAT_ACTIONS.CHANGE_RECEIVER:
            return {
                ...state,
                receiver: payload
            }
        case CHAT_ACTIONS.DELETE_MESSAGE:
            return {
                ...state,
                chats: payload
            }
        default:
            return state;
    }

}

export default chatReducer 