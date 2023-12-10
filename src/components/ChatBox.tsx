// components/ChatInterface.tsx

import React, { useState, FormEvent } from 'react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

export function ChatBox () {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const sendMessage = (event: FormEvent) => {
        event.preventDefault();
        const newMessage: Message = {
            id: messages.length,
            text: inputValue,
            sender: 'user'
        };
        // Add your logic here to get the bot's response
        const botResponse: Message = {
            id: messages.length + 1,
            text: 'Bot response here...',
            sender: 'bot'
        };
        setMessages([...messages, newMessage, botResponse]);
        setInputValue('');
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-emerald-900 rounded-xl shadow-md">
            <div className="mb-4 h-64 overflow-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`p-2 my-2 rounded ${
                            message.sender === 'user' ? 'bg-blue-700 ml-auto' : 'bg-gray-700'
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="flex">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 p-2 border-2 text-black bg-gray-200 border-gray-900 rounded-l-md"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">
                    Send
                </button>
            </form>
        </div>
    );
};
