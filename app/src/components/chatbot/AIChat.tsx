"use client";

import { useState } from "react";
import CommonBtns from "../Buttons/CommonBtns";
import { usePostChatBotMethod } from "../../hooks/api/useAi";

export default function AIChat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const Postchatbot = usePostChatBotMethod()
    const sendMessage = async () => {
        setLoading(true);
        Postchatbot.mutate(message, {
            onSuccess: (data) => {
                console.log('API Response:', data);
                setResponse(data.output);
                setLoading(false);
                setMessage('');
            },
            onError: (error) => {
                console.error('Failed to post chatbot message:', error);
                setLoading(false);
            }
        });
    };

    // const sendMessage = async () => {
    //     setLoading(true);
    //     const res = await fetch("/api/ai/chat",
    //         {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json", },
    //             body: JSON.stringify({ message }),
    //         }
    //     );
    //     const data = await res.json();
    //     console.log('API Response:', data);
    //     setTimeout(() => {
    //         setResponse(data.output);
    //         setLoading(false);
    //         setMessage('')
    //     }, 2000);
    // };

    return (
        <div className="mt-10 border p-5 rounded-xl">
            <div className="mt-5 rounded-2xl bg-white p-6 shadow-md border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">
                    AI Product Response
                </h2>

                <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {response}
                </div>
            </div>
            <div className="w-full flex gap-2 mt-3">
                <input
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Ask AI"
                    className="border px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <CommonBtns
                    btnText={loading ? <div className="loader"></div> : 'Send'}
                    onClick={sendMessage}
                    type="submit"
                    buttonType="btn-primary"
                    className={'w-30! py-1! px-2!'}
                />
                {/* <button
                    onClick={sendMessage}
                    className="bg-black text-white px-5 py-3 mt-3"
                >
                    Send
                </button> */}
            </div>



        </div>
    );
}