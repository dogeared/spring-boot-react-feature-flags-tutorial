package com.example.boersma.realtimewebchat.message;

public class Message {
    private final String userName;
    private final String messageContent;

    public Message(String userName, String messageContent) {
        this.userName = userName;
        this.messageContent = messageContent;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public String getUserName() {
        return userName;
    }
}
