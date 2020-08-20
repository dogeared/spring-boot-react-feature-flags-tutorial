import React from 'react';
import {TextInput, Text} from "evergreen-ui";

export default (props) => {
  const updateUsername = props.updateUsername;
  const currentUsername = props.currentUsername;
  return (
    <div>
      <Text size={500} className="margin-right">What's your user name?</Text>
      <TextInput type="text" name="username" onChange={e => updateUsername(e.target.value)} defaultValue={currentUsername}/>
    </div>
    )
}