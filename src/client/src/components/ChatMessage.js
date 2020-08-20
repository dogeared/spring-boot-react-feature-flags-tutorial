import React from "react";
import {Text, Strong} from 'evergreen-ui';

export default (props) => {
  const userName = props.userName;
  const message = props.message;

  return(
    <div>
      <Strong size={400} >{userName}:</Strong>
      <Text  size={400}>{message}</Text>
      <hr />
    </div>
  )
}