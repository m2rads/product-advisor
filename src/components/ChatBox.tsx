import React, { useState, FormEvent } from 'react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

export function ChatBox () {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();
        const newMessage: Message = {
            id: messages.length,
            text: inputValue,
            sender: 'user'
        };

        // Add the user's message to the messages array
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputValue('');

        try {
            const response = await fetch(`/api/openai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatInput: inputValue }),
            });

            if (!response.body) {
                throw new Error('No response body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let completeData = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                completeData += decoder.decode(value, { stream: true });
            }

            // Assuming completeData contains the bot's reply
            const botResponse: Message = {
                id: messages.length + 1,
                text: completeData, // the completeData string is the bot's response
                sender: 'bot'
            };

            // Add the bot's response to the messages array
            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-emerald-900 rounded-xl shadow-md">
            <div className="mb-4 h-80 overflow-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`p-2 my-2 rounded ${
                            message.sender === 'user' ? 'ml-auto text-right' : 'text-left'
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
