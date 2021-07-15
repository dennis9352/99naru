import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const ChatLog = (props) => {
  const [chats, setChats] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://13.209.13.200");
    socketRef.current.on("chatLog", (chats) => {
      console.log(chats);
      console.log({ chats });
      setChats([...chats, {chats}]);
    });
    return () => socketRef.current.disconnect();
  }, [])

  console.log(chats);
  return chats.map((chats, index) => (
    <div key={index}>
      <h3>
        {chats.nickname}: <span>{chats.message}</span>
        <br></br>
        <span>{chats.date}</span>
      </h3>
    </div>
  ));
}

export default ChatLog;