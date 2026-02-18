import { NextResponse } from "next/server"; 

export async function POST(req: Request) {
    try {
        const body = await req.json(); 

        const res = await fetch("http://127.0.0.1:8081/api/chat/send", {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(body),
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