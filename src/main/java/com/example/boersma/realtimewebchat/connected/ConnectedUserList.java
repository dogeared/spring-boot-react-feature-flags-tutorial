package com.example.boersma.realtimewebchat.connected;
import java.util.HashMap;

public class ConnectedUserList {
    public HashMap<String, ConnectedUser> connectedUsers;

    public ConnectedUserList() {
        this.connectedUsers = new HashMap<>();
    }

    private void replaceUser(ConnectedUser user) {
        this.removeUser(user);
        this.initializeUser(user);
    }

    private void removeUser(ConnectedUser user) {
        this.connectedUsers.remove(user.oldUserName);
    }

    private void initializeUser(ConnectedUser user) {
        this.connectedUsers.put(user.currentUserName, new ConnectedUser(user.currentUserName));
    }

    public void handleUser(ConnectedUser user) {
        if(!user.currentUserName.equals("") && user.oldUserName.equals("")) {
            // This is a new user
            this.initializeUser(user);
        }

        if(!user.currentUserName.equals("") && !user.oldUserName.equals("")) {
            // New and old means that it's a name replacement
            this.replaceUser(user);
        }

        if(!user.oldUserName.equals("") && user.currentUserName.equals("")) {
            // Old but no new means remove the user from the list
            this.removeUser(user);
        }
    }
}
