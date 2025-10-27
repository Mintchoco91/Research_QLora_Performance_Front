import React, { useState } from "react";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex items-center mt-3 border-t border-gray-200 pt-2">
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        className="flex-1 border rounded-xl px-3 py-2 text-gray-700 focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-yellow-400 text-gray-800 px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
      >
        전송
      </button>
    </div>
  );
}

export default ChatInput;
