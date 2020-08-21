import React, {useState} from 'react';
import './App.css';
import PageHeader from "./components/PageHeader";
import UsernameComponent from "./components/UsernameComponent";
import MessageList from "./components/MessageList";
import MessageBox from "./components/MessageBox";
import ConnectedUserList from "./components/ConnectedUserList";
import SockJs from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
import {Pane} from "evergreen-ui";
import {SplitFactory, SplitTreatments} from '@splitsoftware/splitio-react';

/* Begin Setup */
const socket = new SockJs("http://localhost:8080/chatroom", {}, {CheckOrigin: () => false});
socket.onopen = () => {
  console.log('Connected to server');
};
socket.onclose = () => {
  console.log('Disconnected from server');
};

const stompClient = Stomp.over(socket);
stompClient.connect({}, () => {
  console.log('Connected to chat server');
});
/* End Setup */

const splitConfig = {
  core: {
    authorizationKey: process.env.REACT_APP_AUTH_KEY,
    key: 'CUSTOMER_ID'
  }
};

function App() {
  const [userName, updateUsername] = useState("");
  const [chatMessages, updateChatMessages] = useState([]);
  const [currentMessageId, updateMessageId] = useState(0);
  const [connectedUsers, updateConnectedUsers] = useState([]);

  /* Being Handlers */
  const changeConnectedUsers = (connectedUserList) => {
    console.log('connected user list', connectedUserList);
    const names = Object.entries(connectedUserList.connectedUsers).map((kvp) => kvp[1].displayName);
    const connectedUsers = [...names];
    updateConnectedUsers(connectedUsers);
  }

  const sendConnectedUser = (connectedUser) => {
    const userConnectionInfo = {oldUserName: userName, currentUserName: connectedUser};
    console.log('user connection info', userConnectionInfo);
    stompClient.publish({destination: '/api/chat/connected_users', body: JSON.stringify(userConnectionInfo)});
    updateUsername(connectedUser);
  };

  const addNewChatMessage = (newMessage) => {
    const messagesWithNew = [...chatMessages, newMessage];
    updateChatMessages(messagesWithNew);
  };

  const sendChatMessage = (newMessage) => {
    const messageObj = {userName, messageContent: newMessage, messageId: currentMessageId};
    stompClient.publish({destination: '/api/chat', body: JSON.stringify(messageObj)});
    updateMessageId(currentMessageId + 1);
  };

  if(stompClient.connected) {
    stompClient.subscribe('/chat', (message) => {
      console.log('message received', message);
      addNewChatMessage(JSON.parse(message.body));
    });

    stompClient.subscribe('/chat/connected_users', (connectedUserList) => {
      console.log('connected users received', connectedUserList);
      changeConnectedUsers(JSON.parse(connectedUserList.body));
    });
  }
  /* End Handlers */

  const featureName = 'display_connected_users';
  return (
      <SplitFactory config={splitConfig}>
        <SplitTreatments names={[featureName]}>
          {({treatments, isReady}) => {
            const showConnectedUsers = treatments[featureName];
            return isReady ?
              <Pane width="100%"  display="flex" alignItems="center" justifyContent="center" className="margin-top">
                <div>
                  <PageHeader/>
                  <UsernameComponent currentUsername={userName} updateUsername={sendConnectedUser}/>
                  {showConnectedUsers && showConnectedUsers.treatment === 'on' ? <ConnectedUserList users={connectedUsers}/> : null }
                  <MessageList messages={chatMessages}/>
                  <MessageBox sendMessage={sendChatMessage}/>
                </div>
              </Pane> : null
            }}
        </SplitTreatments>
      </SplitFactory>
  );
}

export default App;
