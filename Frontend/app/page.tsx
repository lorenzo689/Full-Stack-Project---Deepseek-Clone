"use client";

import { assets } from "@/assets/assets"; 
import  Sidebar from "@/components/Sidebar"; 
import PromptBox from "@/components/PromptBox";
import Message from "@/components/Message"; 
import Image from "next/image"; 
import { useState, useEffect } from "react"; 

type Role = "user" | "ai"; 

type ChatMessage = {
  id: string; 
  role: Role; 
  content: string; 
}

export default function Home() {
  const [expand, setExpand] = useState<boolean>(false);  
  const [messages, setMessages] = useState<ChatMessage[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch("/api/chat/messages");
        if (res.ok) {
          const data = await res.json();
          setMessages(data.map((msg: { id: number; role: string; content: string }) => ({
            id: msg.id.toString(),
            role: msg.role as "user" | "ai",
            content: msg.content
          })));
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    loadMessages();
  }, []); 

  return (
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>

        <div className=" flex flex-1 flex-col items-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            
            <Image onClick={()=> setExpand((prev) => !prev)} 
            className="rotate-180" src={assets.menu_icon} alt="Menü"/>
            
            <Image className="opacity-70" src={assets.chat_icon} alt="Chat"/>
          </div>

          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="Logo" className="h-16 w-auto" />
                <p className="text-2xl font-medium">Hi, I am Deepseek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
              </div>
          ):
          (
          <div className="w-full max-w-3xl flex-1 overflow-y-auto pt-16 md:pt-0">
            {messages.map((m) => (
              <Message key={m.id} role={m.role} content={m.content} />
            ))}
          </div>
        )}

        <PromptBox isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                 setMessages={setMessages}/>
        <p className="text-xs absolute bottom-1 text-gray-500">AI generated, for reference only</p>

        </div>
      </div>
  );
}
