'use client'; 

import { assets } from '@/assets/assets'; 
import Image from "next/image"; 
import React, { useState } from 'react'; 

type Role = "user" | "ai"; 

type ChatMessage = {
    id: string; 
    role: Role; 
    content: string; 
}; 

type PromptBoxProps = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; 
    isLoading: boolean;
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>; 
}; 

    const PromptBox: React.FC<PromptBoxProps> = ({ 
        setIsLoading,
        isLoading,  
        setMessages 
    }) => {
        const [prompt, setPrompt] = useState(""); 

        const sendMessage = async () => {
            const content = prompt.trim(); 
            if (!content || isLoading) return;

        const userMsg: ChatMessage = {
            id: crypto.randomUUID(), 
            role: "user",
            content
        }; 

           setMessages(prev => [...prev, userMsg]); 
           setPrompt(""); 
           setIsLoading(true); 

           try {
            const res = await fetch("/api/chat/send", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content })
            }); 

            if (!res.ok) {
                const text = await res.text(); 
                throw new Error(`API Error ${res.status}: ${text}`); 
            }; 

            const data = await res.json(); 

            setMessages(prev => [...prev, {
                id: crypto.randomUUID(), 
                role: "ai", 
                content: data.reply
            }]); 

           } catch(error) {

            console.log(error); 

            setMessages(prev => [...prev, {
                id: crypto.randomUUID(), 
                role: "ai", 
                content: "Fehler: Backend nicht erreichbar."
            }]); 

           } finally {

            setIsLoading(false); 

           }; 
        };  

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(); 
            sendMessage(); 
        }; 
    

  return (
    <form onSubmit={handleSubmit}
        className={`w-full max-w-2xl bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        
        <textarea
        className='outline-none w-full resize-none overflow-hidden wrap-break-word bg-transparent'
        rows={2}
        placeholder='Message DeepSeek' 
        required 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); 
                sendMessage(); 
                }; 
            }}/>

        <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>

                <button type="button" className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    
                    <Image className='h-5' src={assets.deepthink_icon} alt='DeepThink'/>
                    DeepThink (R1)
                </button>

                <button type="button" className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image className='h-5' src={assets.deepthink_icon} alt='Search'/>
                    Search
                </button>

            </div>

            <div className='flex items-center gap-2'>

                <button type="button">
                <Image className='w-4 cursor-pointer' src={assets.pin_icon} alt='Attach'/>
                </button>

                <button type="submit" disabled={!prompt.trim() || isLoading} className={`rounded-full p-2 cursor-pointer ${prompt.trim() && !isLoading ? "bg-primary" : "bg-[#71717a]"}`}>
                    
                    <Image className='w-3.5 aspect-square' src={prompt.trim() ? assets.arrow_icon : assets.arrow_icon_dull} alt='Send'/>
                
                </button>
            </div>

        </div>
    </form>
  ); 
}; 

export default PromptBox


