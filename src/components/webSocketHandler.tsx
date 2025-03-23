import { useState, useEffect } from "react";

const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const ws = new WebSocket(url);
        ws.onopen = () => console.log("Connected to WebSocket");
        ws.onmessage = (event) => setMessages((prev) => [...prev, event.data]);
        ws.onerror = (error) => console.error("WebSocket Error:", error);
        ws.onclose = () => console.log("WebSocket closed");

        setSocket(ws);
        return () => ws.close();
    }, [url]);

    const sendMessage = (message: string) => socket?.send(message);
    
    return { messages, sendMessage };
};

export default useWebSocket;
