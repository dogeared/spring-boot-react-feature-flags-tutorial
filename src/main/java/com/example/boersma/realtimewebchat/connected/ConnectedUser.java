package com.example.boersma.realtimewebchat.connected;

public class ConnectedUser {
    public String oldUserName;
    public String currentUserName;
    public String displayName;

    public ConnectedUser(String oldUserName, String currentUserName) {
        this.oldUserName = oldUserName;
        this.currentUserName = currentUserName;
        this.displayName = currentUserName;
    }

    public ConnectedUser(String displayName) {
        this.displayName = displayName;
    }
}
