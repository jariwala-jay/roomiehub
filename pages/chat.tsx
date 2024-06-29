import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("http://localhost:5000/api/friends");
        setFriends(response.data);
      } catch (error) {
        setError("Error fetching friends.");
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/chat", {
            params: {
              sender_id: currentUser.id,
              receiver_id: selectedFriend.id,
            },
          });
          setMessages(response.data);
        } catch (error) {
          setError("Error fetching messages.");
        }
      };

      fetchMessages();
    }
  }, [currentUser?.id, selectedFriend]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("receiveMessage", (newMessage) => {
      if (
        newMessage.sender_id === selectedFriend?.id ||
        newMessage.receiver_id === selectedFriend?.id
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("disconnect");
    };
  }, [selectedFriend]);

  const sendMessage = async () => {
    const newMessage = {
      sender_id: currentUser.id,
      receiver_id: selectedFriend.id,
      message,
    };
    socket.emit("sendMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setMessages([]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Friends</h2>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`p-2 mb-2 bg-white cursor-pointer hover:bg-gray-200 ${
              selectedFriend?.id === friend.id ? "bg-gray-300" : ""
            }`}
            onClick={() => handleFriendClick(friend)}
          >
            {friend.full_name}
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4 flex flex-col">
        {selectedFriend ? (
          <>
            <div className="flex-1 overflow-y-scroll mb-4">
              <h2 className="text-xl font-bold mb-4">
                Chat with {selectedFriend.full_name}
              </h2>
              <div className="messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.sender_id === currentUser.id
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="p-2 border border-gray-300 rounded-lg w-full"
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500">
            Select a friend to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
