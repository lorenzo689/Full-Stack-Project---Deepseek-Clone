'use client'; 

import { assets } from '@/assets/assets'; 
import Image from "next/image"; 
import React, { useState } from 'react'; 

type PromptBoxProps = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; 
    isLoading: boolean; 
}; 

    const PromptBox: React.FC<PromptBoxProps> = ({ setIsLoading, isLoading }) => {
        const [prompt, setPrompt] = useState<string>(''); 

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPrompt(e.target.value); 
        }; 

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!prompt.trim() || isLoading) return; 

            setIsLoading(true); 

            // Erinnerung an mich hier muss später API call rein

        };  
    

  return (
    <form onSubmit={handleSubmit}
        className={`w-full max-w-2xl bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        
        <textarea
        className='outline-none w-full resize-none overflow-hidden wrap-break-word bg-transparent'
        rows={2}
        placeholder='Message DeepSeek' required onChange={handleChange} value={prompt}/>

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
