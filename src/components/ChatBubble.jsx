import React from "react";

function ChatBubble({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-2`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl whitespace-pre-line ${
          isUser
            ? "bg-yellow-300 text-gray-900 rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatBubble;
