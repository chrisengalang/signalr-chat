import {useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";

function App() {

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleSendMessage = () => {
    if (isConnected) {
      connection.invoke('SendMessage', name, message)
        .then(() => console.log('Message sent!'))
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl('http://localhost:5094/text-chat')
      .build();

    setConnection(conn);

    conn.on("ReceiveMessage", (name, message) => {
      console.log('Received message!');
      setMessages(previous => [...previous, { name, message }])
    })

    conn.start()
      .then(() => {
        console.log('Connected to socket!')
        setIsConnected(true);
      })
      .catch((err) => console.log(err));

    return () => {
      conn.stop()
    }

  }, [])

  return (
    <div>
      <label>User: </label>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      <label>Message: </label>
      <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
      <button onClick={handleSendMessage}>Send Message</button>
      <br/>
      <ul>
        {
          messages.map((message, index) => (
            <li key={index}>{ `${message.name}: ${message.message}` }</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
