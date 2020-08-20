import React from "react";
import ChatMessage from "./ChatMessage";
import {Heading, Text} from "evergreen-ui";

export default (props) => {
  const messages = props.messages;
  return(
    <div className="margin-top margin-bottom">
      <Heading size={800}>Messages:</Heading>
      <span>
        {messages.length ?
          messages.map(message => <ChatMessage key={message.messageId} userName={message.userName} message={message.messageContent}/>)
        : <Text>No messages currently posted. Try posting one to start out!</Text>}
      </span>
    </div>
  )
}