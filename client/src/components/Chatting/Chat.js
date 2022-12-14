import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import Conversation from "./Conversations/Conversations";
import Message from "./Message/Message";
import * as chatApi from "../../api/chatting";
import { UserContext } from "../../App";
import io from "socket.io-client";
import { mainUrl } from "../../api/index";
import SidebarHeading from "../General/SidebarHeading/SidebarHeading";
import SendImg from "../../assets/images/TextBox/send.png";
import SendHoverImg from "../../assets/images/TextBox/send-hover.png";
import OpenChat from "../../assets/images/Chat/OpenChat.png";
import ChatBar from "../General/ChatBar/ChatBar";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../General/Loading/Loading";

const Chat = () => {
  const { state, dispatch } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const socket = useRef(io(mainUrl));
  const scrollRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState();

  useEffect(() => {
    // When the user connects it emits itself to the backend
    // so that user can join a room (send from client to server)
    socket.current.emit("addUserToChat", state._id);
  }, [state]);

  useEffect(() => {
    // Get all conversations (personal chat) with the user to be displayed on the left
    chatApi
      .getConversation(state._id)
      .then((result) => {
        if (result.data.state == "false") console.log(result.data.message);
        else {
          setConversations(result.data.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `${
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong."
          }`
        );
      });
  }, []);

  useEffect(() => {
    if (currentChat) {
      // Get message for the selected chat
      chatApi
        .getMessage(currentChat._id)
        .then((result) => {
          if (result.data.status == "false") console.log(result.data.message);
          else setMessages(result.data.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            `${
              err.response && err.response.data
                ? err.response.data.message
                : "Something went wrong."
            }`
          );
          setIsLoading(false);
        });
    }
  }, [currentChat]);

  // Function to check if the id the logged in user _id or not
  const checkOwn = (id) => {
    return id === state._id;
  };

  // When a message is sent
  const onSubmitHandler = (e) => {
    if (!newMessage) return;
    const message = {
      senderId: state._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiver = currentChat.members.find(
      (memeber) => memeber._id !== state._id
    );

    // Sends to message to backend to be stored in DB
    chatApi
      .newMessage(message)
      .then((result) => {
        setMessages([...messages, result.data.data]);
        setNewMessage("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `${
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong."
          }`
        );
      });

    // Send the message to the server to broadcast it in the room
    socket.current.emit("sendMessage", {
      senderId: state._id,
      receiverId: receiver._id,
      text: newMessage,
    });
  };

  useEffect(() => {
    // when a message is recived from the other user in the room
    socket.current.on("getMessage", (data) => {
      const newdData = {
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      };
      setMessages((prev) => {
        return [...prev, newdData];
      });
    });
  }, []);

  // Function to scroll chats to the bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) return <Loading />;
  return (
    <div className="chat">
      <ToastContainer />
      {(window.innerWidth > 900 || !currentChat) && (
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <SidebarHeading heading="Chat" />
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <div className="chatMenuScroll">
              {conversations.map((chat) => (
                <div key={chat._id} onClick={() => {
                  setCurrentChat(chat);
                  setActive(chat);
                }}>
                  <Conversation conversation={chat} currentUser={state} active={active}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {(window.innerWidth > 900 || currentChat) && (
        <div className="chatBox">
          {currentChat ? (
            <div className="chatBoxWrapper">
              <ChatBar
                conversation={currentChat}
                currentUser={state}
                video={true}
                onGoBack={() => {setCurrentChat(null);
                                setActive(null);}}
              />
              <div className="chatBoxTop">
                {messages.map((message, i) => (
                  <div key={message._id ? message._id : i} ref={scrollRef}>
                    <Message
                      own={checkOwn(message.sender._id)}
                      message={message}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Type a new message"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
              </div>
              <div className="messageSendBtn">
                <div onClick={() => onSubmitHandler()}
                  className="submitButton"
                  onMouseOver={() => { 
                    let img = document.getElementById("sendImage");
                    img.src = SendHoverImg;
                  }}
                  onMouseOut={() => { 
                    let img = document.getElementById("sendImage");
                    img.src = SendImg;
                  }}>
                  <img src={SendImg} alt="Send" id="sendImage"/>
                </div>
              </div>
            </div>
          ) : (
            <div className="openConversation">
              <img src={OpenChat} className="openConversationImg" />
              <div className="openConversationText">Open a conversation to start a chat</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
