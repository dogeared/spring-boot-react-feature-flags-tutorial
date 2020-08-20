package com.example.boersma.realtimewebchat.connected;
import java.util.HashMap;

public class ConnectedUserList {
    public HashMap<String, ConnectedUser> connectedUsers;

    public ConnectedUserList() {
        this.connectedUsers = new HashMap<String, ConnectedUser>();
    }

    /**
     * Replace existing user in the hashmap
     * @param user - The user with old and new username
     */
    private void replaceUser(ConnectedUser user) {
        this.removeUser(user);
        this.initializeUser(user);
    }

    /**
     * Removes a user from the connected user hashmap
     * @param user - The user with an old username
     */
    private void removeUser(ConnectedUser user) {
        this.connectedUsers.remove(user.oldUserName);
    }

    /**
     * Adds a brand new user to the connected user hashmap
     * @param user - The user with only a current username
     */
    private void initializeUser(ConnectedUser user) {
        this.connectedUsers.put(user.currentUserName, new ConnectedUser(user.currentUserName));
    }

    /**
     * Attempts to handle a user based on the information contained in the
     * ConnectedUser object
     * @param user - The user to process
     */
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
