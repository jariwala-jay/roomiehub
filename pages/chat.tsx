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
  const typingTimeoutRef = useRef(null);
  const [isRead, setIsRead] = useState(true);
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

      setFriends((prevFriends) =>
        prevFriends.map((friend) => {
          if (
            friend.id === newMessage.sender_id ||
            friend.id === newMessage.receiver_id
          ) {
            return {
              ...friend,
              latestMessage: newMessage,
            };
          }
          return friend;
        })
      );
    });

    socket.on("updateMessageStatus", (updatedMessage) => {
      setFriends((prevFriends) =>
        prevFriends.map((friend) => {
          if (
            friend.id === updatedMessage.sender_id ||
            friend.id === updatedMessage.receiver_id
          ) {
            return {
              ...friend,
              latestMessage: updatedMessage,
            };
          }
          return friend;
        })
      );
    });

    socket.on("userTyping", (data) => {
      if (
        data.sender_id !== currentUser.id &&
        data.receiver_id === currentUser.id
      ) {
        setTypingUsers((prevUsers) => [
          ...new Set([...prevUsers, data.sender_name]),
        ]);
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
      socket.off("updateMessageStatus");
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
      is_read: false,
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

  const handleFriendClick = async (friend) => {
    setSelectedFriend(friend);
    setMessages([]);
    scrollToBottom();

    try {
      // Only mark messages as read if the current user is the receiver
      if (
        friend.latestMessage.sender_id === friend.id &&
        friend.latestMessage.receiver_id === currentUser.id
      ) {
        console.log("inside..");
        const response = await axios.post(
          "http://localhost:5000/api/chat/markAsRead",
          {
            sender_id: friend.id,
            receiver_id: currentUser.id,
          }
        );

        if (response.status === 200) {
          // Fetch updated messages
          const messagesResponse = await axios.get(
            "http://localhost:5000/api/chat",
            {
              params: {
                sender_id: currentUser.id,
                receiver_id: friend.id,
              },
            }
          );
          setMessages(messagesResponse.data);
          setIsRead(false);
        }
      } else {
        // Fetch messages without marking them as read
        const messagesResponse = await axios.get(
          "http://localhost:5000/api/chat",
          {
            params: {
              sender_id: currentUser.id,
              receiver_id: friend.id,
            },
          }
        );
        setMessages(messagesResponse.data);
      }
    } catch (error) {
      setError("Error marking messages as read.");
    }
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
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <>
      <div className="flex h-[90vh] mx-auto max-w-[2160px] bg-[#fff7e4]">
        <div className="w-1/4 bg-white p-4 overflow-y-scroll">
          <h2 className="text-xl font-bold mb-4 text-[#333231]">Friends</h2>
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`p-2 mb-2 bg-[#fff7e4] cursor-pointer hover:bg-[#ffc336] ${
                selectedFriend?.id === friend.id ? "bg-[#ffc336]" : ""
              } rounded-lg flex flex-col  justify-between`}
              onClick={() => handleFriendClick(friend)}
            >
              <div className="flex relative  items-center">
                {friend.profile_pic && (
                  <img
                    src={`data:image/jpeg;base64,${Buffer.from(
                      friend.profile_pic
                    ).toString("base64")}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full inline-block mr-2"
                  />
                )}
                {friend.latestMessage && isRead ? (
                  friend.latestMessage.is_read ||
                  friend.latestMessage.sender_id === currentUser.id ? (
                    <span className="text-[#333231] ">{friend.full_name}</span>
                  ) : (
                    <span className="text-[#333231] font-bold">
                      {friend.full_name}
                    </span>
                  )
                ) : (
                  <span className="text-[#333231] ">{friend.full_name}</span>
                )}
                {/* <span
                  className={`text-[#333231] ${
                    friend.latestMessage?.is_read ||
                    friend.latestMessage.sender_id === currentUser.id
                      ? ""
                      : "font-bold"
                  }`}
                >
                  {friend.full_name}
                </span> */}
                {friend.latestMessage && isRead ? (
                  friend.latestMessage.is_read ||
                  friend.latestMessage.sender_id === currentUser.id ? (
                    ""
                  ) : (
                    <span className="mr-2 absolute right-0">•</span>
                  )
                ) : (
                  " "
                )}
              </div>
              {friend.latestMessage && (
                <div className="text-xs text-gray-600">
                  {friend.latestMessage.message}
                </div>
              )}
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
                          className={`p-3 rounded-[2rem] ${
                            msg.sender_id === currentUser.id
                              ? "bg-[#333231] text-white text-right "
                              : "bg-gray-200 text-black text-left "
                          }`}
                        >
                          <p className="px-2">{msg.message}</p>

                          <p
                            className={`absolute -bottom-[10px] text-xs text-gray-400 mt-1 ${
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
            <div className="text-gray-500">
              Select a friend to start chatting.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
