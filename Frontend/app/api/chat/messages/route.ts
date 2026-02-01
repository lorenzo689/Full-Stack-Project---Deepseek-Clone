import { NextResponse } from "next/server"; 

export async function GET() {
    const res = await fetch("http://127.0.0.1:8081/api/chat/messages", {
        method: "GET", 
        headers: { "Content-Type": "application/json" }, 
    }); 

    const data = await res.json(); 
    return NextResponse.json(data, { status: res.status }); 
};