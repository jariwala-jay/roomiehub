import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = ({ currentUser, selectedUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chat", {
          params: {
            sender_id: currentUser.id,
            receiver_id: selectedUser.id,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUser.id, selectedUser.id]);

  const sendMessage = async () => {
    const newMessage = {
      sender_id: currentUser.id,
      receiver_id: selectedUser.id,
      message,
    };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender_id === currentUser.id
                ? "message-sent"
                : "message-received"
            }
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
