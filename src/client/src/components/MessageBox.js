import React, {useState} from "react";
import {TextInput, Button, Text} from "evergreen-ui";

export default (props) => {
  const sendMessage = props.sendMessage;
  const [messageContent, updateContent] = useState("");
  const sendNewMessage = (newMessage) => {
    sendMessage(newMessage);
    updateContent("");
  };
  return(
    <div>
      <Text size={500} className="margin-right">Send a Message:</Text>
      <TextInput className="margin-right" type="textbox" name="newMessage" placeholder="Enter a new message here..." value={messageContent} onChange={e => updateContent(e.target.value)}/>
      <Button appearance="primary" onClick={() => sendNewMessage(messageContent)}>Send Message</Button>
    </div>
  )
}