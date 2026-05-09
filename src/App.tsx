import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  //const [input, setInput] = useState(0)

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendPrompt = async () => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: input,
    }),
  });

  const data = await res.json();
  setResponse(data.response);
};


  return (
    <>
      <section id="center">
        <div id="user_input">
          {/* <img src={reactLogo} className="framework" alt="React logo" /> */}
        <input
          type="text"
          placeholder="Hey! How can I help you today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>{
            if(e.key === "Enter" && input.trim() !== ""){
              sendPrompt();
            }
          }}
        >
          {/* Count is {count} */}
        </input>
        </div>
         {/* <div id="ai_output"> */}
         <div className="mt-4 p-4 border whitespace-pre-wrap">
          {response}
         </div>

      </section>

    
    </>
  )
}

export default App

