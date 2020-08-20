import React from "react";
import {Heading, Text} from "evergreen-ui";

export default (props) => {
  const users = props.users;
  return(<div>
    <Heading size={800}>Connected Users</Heading>
    {users.map(username => <span>
      <Text size={500}>{username}</Text>
      <br/>
    </span>)}
  </div>)
};