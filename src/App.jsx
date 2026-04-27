import React, { useState } from "react";
import axios from "axios";
import "./App.css";
//import bgImage from "./assets/wow_bg_쓰랄.png"; // ← 네가 올린 배경 이미지 경로
import bgImage from "./assets/wow_bg_마나스톰.png"; // ← 네가 올린 배경 이미지 경로

function App() {
  const [messages, setMessages] = useState([
    //{ sender: "npc", text: "Setting : Model = Llama-3.2-3B\nRank = 4, Alpha = 4 " },
    { sender: "npc", text: "Setting : Model = Llama-3.2-1B\nLoRA, Rank = 2, Alpha = 2\nVRAM 사용 : 4737" },
    //{ sender: "npc", text: "Setting : Model = Llama-3.2-3B\nQLoRA, Rank = 32, Alpha = 64\nVRAM 사용 : 3117" },
    { sender: "npc", text: "마나스톰 : " + "이 위대한 존재를 찾아온 용기를 칭찬해주지! 무슨 일이냐!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setInput("")
    setLoading(true)

    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: "User : " + input }]);

    try {
      // 백엔드 API 호출
      //const res = await axios.post("http://121.190.27.83:58900/api/infer", {
      const res = await axios.post("http://localhost:8000/api/infer", {        
        input: input,
      });

      //const botMsg = { sender: "bot", text: "Thrall : " + res.data.answer };
      const botMsg = { sender: "bot", text: "마나스톰 : " + res.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "서버와 통신 중 오류가 발생했습니다." },
      ]);
    } finally {
      setLoading(false);
    }
}

  return (
    <div
      className="chat-window"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === "user" ? "right" : "left"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex ) 이름이 무엇인가? , 태어난 곳이 어디입니까?"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
