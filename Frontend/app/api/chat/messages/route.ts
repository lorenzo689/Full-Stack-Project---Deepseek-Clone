import { NextResponse } from "next/server"; 

export async function GET() {
    try {
        const res = await fetch("http://127.0.0.1:8081/api/chat/messages", {
            method: "GET", 
            headers: { "Content-Type": "application/json" }, 
        }); 

        if (!res.ok) {
            return NextResponse.json({ error: "Backend error" }, { status: res.status });
        }

        const data = await res.json(); 
        return NextResponse.json(data, { status: res.status }); 
    } catch (error) {
        return NextResponse.json({ error: "Backend not reachable" }, { status: 500 });
    }
}; 