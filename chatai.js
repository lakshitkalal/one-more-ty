// components/ChatAI.js
import { useState } from "react";

export default function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Call free AI API (example: Hugging Face)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    const data = await response.json();
    const aiReply = data?.generated_text || "Sorry, I could not reply.";

    // Add AI reply
    setMessages([...newMessages, { sender: "ai", text: aiReply }]);
    setInput("");
  };

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-lg mt-4">
      <h2 className="text-lg font-bold mb-2">💬 AI Trading Assistant</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-1 p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-200 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border rounded-l-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI about the chart..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
