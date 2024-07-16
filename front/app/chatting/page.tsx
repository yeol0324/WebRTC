"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000", {
  withCredentials: true,
});

type Message = { message: string; sender: string };
export default function Home() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 메시지 수신 핸들러 등록
    socket.on("message", (payload: Message) => {
      setMessages((prev) => [...(prev ?? []), payload]);
    });

    // 정리(clean-up) 함수 반환
    return () => {
      socket.off("message"); // 기존 핸들러 제거
    };
  }, []);

  const sendMessage = () => {
    if (message && username) {
      socket.emit("message", { sender: username, message });
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages &&
          messages.map((msg, index) => (
            <div key={index}>
              <b>{msg.sender}:</b> {msg.message}
            </div>
          ))}
      </div>
    </div>
  );
}
