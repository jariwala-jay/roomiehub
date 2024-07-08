import { useState, useEffect, useRef } from "react";
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
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  const messagesEndRef = useRef(null);

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
          scrollToBottom();
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
        setMessages((prevMessages) => {
          if (!prevMessages.find((msg) => msg.id === newMessage.id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
        playNotificationSound();
        scrollToBottom();
      }
    });

    socket.on("userTyping", (data) => {
      if (
        data.sender_id !== currentUser.id &&
        data.receiver_id === currentUser.id
      ) {
        setTypingUsers((prevUsers) => [...prevUsers, data.sender_name]);
      }
    });

    socket.on("stopTyping", (data) => {
      setTypingUsers((prevUsers) =>
        prevUsers.filter((name) => name !== data.sender_name)
      );
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("stopTyping");
      socket.off("disconnect");
    };
  }, [selectedFriend]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender_id: currentUser.id,
      receiver_id: selectedFriend.id,
      message,
    };
    socket.emit("sendMessage", newMessage);
    setMessage("");
    socket.emit("stopTyping", {
      sender_id: currentUser.id,
      receiver_id: selectedFriend.id,
      sender_name: currentUser.full_name,
    });
    scrollToBottom();
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setMessages([]);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("userTyping", {
        sender_id: currentUser.id,
        receiver_id: selectedFriend.id,
        sender_name: currentUser.full_name,
      });
    }
    if (isTyping) {
      clearTimeout(isTyping);
    }
    setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", {
        sender_id: currentUser.id,
        receiver_id: selectedFriend.id,
        sender_name: currentUser.full_name,
      });
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    
    <div className="flex h-screen bg-[#fff7e4]">
      <div className="w-1/4 bg-white p-4 overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4 text-[#333231]">Friends</h2>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`p-2 mb-2 bg-[#fff7e4] cursor-pointer hover:bg-[#ffc336] ${
              selectedFriend?.id === friend.id ? "bg-[#ffc336]" : ""
            } rounded-lg flex items-center`}
            onClick={() => handleFriendClick(friend)}
          >
            {friend.profile_pic && (
              <img
                src={`data:image/jpeg;base64,${Buffer.from(friend.profile_pic).toString("base64")}`}
                alt="Profile"
                className="w-8 h-8 rounded-full inline-block mr-2"
              />
            )}
            <span className="text-[#333231]">{friend.full_name}</span>
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4 flex flex-col bg-white">
        {selectedFriend ? (
          <>
            <div className="flex-1 overflow-y-scroll mb-4">
              <h2 className="text-xl font-bold mb-4 text-[#333231]">
                Chat with {selectedFriend.full_name}
              </h2>
              <div className="messages">
                {messages.map((msg, index) => {
                  const profilePic =
                    msg.sender_id === currentUser.id
                      ? currentUser.profile_pic
                      : selectedFriend.profile_pic;

                  return (
                    <>
                    <div
                      key={index}
                      className={`relative mb-2 p-2 rounded-lg flex items-start ${
                        msg.sender_id === currentUser.id
                          ? "self-end flex-row-reverse"
                          : "self-start"
                      }`}
                    >
                      {profilePic && (
                        <img
                          src={`data:image/jpeg;base64,${Buffer.from(
                            profilePic
                          ).toString("base64")}`}
                          alt="Profile"
                          className="w-10 h-10 rounded-full mr-2"
                        />
                      )}
                      <div
                        className={`p-3 rounded-[2rem]  ${
                          msg.sender_id === currentUser.id
                            ? "bg-[#333231] text-white text-right "
                            : "bg-gray-200 text-black text-left "
                        }`}
                      >
                        <p className="px-2">{msg.message}</p>
                        <p className={`absolute -bottom-[10px] text-xs text-gray-400 mt-1 ${
                          msg.sender_id === currentUser.id
                            ? "right-4 "
                            : "left-16"
                        }`}
                        >
                     {new Date(msg.timestamp).toLocaleTimeString([], {
                       hour: "2-digit",
                       minute: "2-digit",
                     })}
                   </p>
                      </div>
                       
                    </div>
                    
                   </>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              {typingUsers.length > 0 && (
                <p className="text-sm text-gray-500">
                  {typingUsers.join(", ")} is typing...
                </p>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="p-2 border border-gray-300 active:border-[#333231] rounded-lg w-full"
              />
              <button
                onClick={sendMessage}
                className={`ml-2 px-6 py-2 ${
                  message.trim() ? "bg-[#333231]" : "bg-gray-300"
                } text-white rounded-lg ${
                  message.trim() ? "hover:bg-[#333231]" : "cursor-not-allowed"
                }`}
                disabled={!message.trim()}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500">Select a friend to start chatting.</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
