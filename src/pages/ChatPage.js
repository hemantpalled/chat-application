import react, { useState, useRef, useEffect } from 'react';
import Dropdown from '../components/atoms/Dropdown';
import useChatContext from '../contexts/ChatContext';
import VerticalDotsIcon from '../static/icons/VerticalDots.svg'
import RemoveIcon from '../static/icons/RemoveIcon.svg'

export default function ChatPage() {
    const { chats, users, activeUser, sendMessage, changeUser, receiver, changeReceiver, deleteMessage } = useChatContext()
    const chatContainerRef = useRef()
    const [sender, setSenders] = useState()
    const [formData, setFormData] = useState({
        message: ''
    })

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const handleSelect = (event) => {
        changeReceiver(event)
        changeUser(event)
    }

    const setvalues = (name, value) => {
        let newData = { ...formData }
        newData[name] = value
        setFormData(newData)
    }

    const onSend = () => {
        let from = activeUser.username
        let to = receiver.username
        sendMessage(from, to, formData.message)
        setFormData({
            message: ''
        })
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onSend();
            e.preventDefault();
        }
    }

    const handleDelete = (chat) => {
        deleteMessage(chat)
    }
    return (
        <div className='container '>
            <p>Select Account</p>
            <Dropdown customStyle={'rounded-2 w-25 bg-secondary fs-4 mb-5 p-1 text-center'} options={users} onSelect={handleSelect} selectedOption={activeUser}></Dropdown>
            <div className='d-flex section_height shadow bg-success rounded-2'>
                <div className='col-6 mx-auto overflow-auto p-5 chat-box-shadow ' ref={chatContainerRef}>

                    <div className='top-0 position-sticky  text-white'>{receiver.name}</div>
                    {chats[activeUser.username]?.map((val, index) => {
                        console.log(val);
                        let HH = val.timestamp.getHours();
                        HH = String(HH).padStart(2, '0');
                        let MM = val.timestamp.getMinutes();
                        MM = String(MM).padStart(2, '0');
                        const isSenderActive = val.sender === activeUser.username;
                        return (
                            <div className='row mb-1' key={index}>
                                <div className='col-11'>
                                    <div className={`d-flex ${isSenderActive ? ' justify-content-end text-end' : 'justify-content-start'}`}>
                                        <div className={`text-black fs-5 box shadow bg-white rounded-2 p-1 bg-gradient ${isSenderActive ? 'text-end' : 'text-start'}`}>
                                            {val.message}
                                        </div>
                                    </div>
                                    <div className={`fs-8 ${isSenderActive ? 'text-end' : 'text-start'}`}>{HH}:{MM}</div>
                                </div>
                                <div className='col-1 m-0 p-0 d-flex justify-content-start align-items-end'>
                                    <img className='icon' src={VerticalDotsIcon} onClick={() => handleDelete(val)} />
                                </div>
                            </div>
                        );
                    })}

                </div>
                <div className='col-6 border-start  d-flex justify-content-center align-items-end'>
                    <div className=''>
                        <textarea className='border fs-4 p-2 rounded-2' type="text" name='message' value={formData.message} onChange={(e) => setvalues('message', e.target.value)} onKeyDown={(e) => onKeyDown(e)} ></textarea>
                        <div className='pl-2 mb-5'><button className='btn btn-info focus-ring ' onClick={onSend}>Send</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}