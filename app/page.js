'use client'
import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

export default function Home() {
  const [display, setDisplay] = useState('')
  const [msg, setMsg] = useState('')
  const [socket, setSocket] = useState(undefined)
  const [messages, setMessages] = useState([])


  useEffect(()=>{
    const socket = io('http://localhost:9123')
  

    setSocket(socket)

    
  }, [])
  

  useEffect(() => {
    if (!socket) return;
    socket.on('received-msg', (msg) => {
      console.log('hi')
      setMessages((prevMessages) => [...prevMessages, msg]);
    })
   }, [socket]);

  const handleMessage = () =>{
    if(msg == ''){
      return;
    }
    console.log(msg)
    socket.emit('message', msg)
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMsg('')
  }

  return (
    <main>
     <p>{display}</p>
      <label>Message</label>
      <input type='text' onChange={(e)=>{setMsg(e.target.value)}} value={msg}></input>
      <button onClick={handleMessage}>Send</button>
      {messages.map((message, index)=>(
        <div>{message}</div>
      ))}
    </main>
  )
}
