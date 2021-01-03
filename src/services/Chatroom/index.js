var db = require( '../../database/connection');

const AddUserToChatroom = (user, roomId) => {
    var chatrooms = db.ref("chatrooms");
    var room = chatrooms.child('-'+roomId.toString());

    let activeUsers = []
    room.once('value', 
        (snapshot) => {
            activeUsers = snapshot.val().activeUsers;
            let userExists = false;
            if(!activeUsers)
                activeUsers = []

                activeUsers.forEach((activeUser) => {
                if(activeUser.user === user.user){
                    userExists = true;
                }
            });

            if(userExists)
                return;
                
            activeUsers.push(user);
            room.update({activeUsers: activeUsers});
        },
        (err) => {
            console.log(err);
        }
    )
    
}

const ChangeEnableCamStatus = (roomId, email, enable) => {
    var chatrooms = db.ref("chatrooms");
    var room = chatrooms.child('-'+roomId.toString());

    room.once('value', (snapshot) => {
        var users = snapshot.val().activeUsers;
        
        users.forEach((user) => {
            if(user.user === email)
                user.cameraEnabled = enable;
        });
        
        room.update({activeUsers: users});
    },(err) => {
        console.log(err);
    });
}

const GetCamEnableUsers = (roomId) => {
    var chatrooms = db.ref("chatrooms");
    var room = chatrooms.child('-'+roomId.toString());

    room.once('value',
    (snap) => {
        console.log(snap.val());
    }),
    (err) => {
        console.log(err);
    };
}

module.exports = { AddUserToChatroom, GetCamEnableUsers, ChangeEnableCamStatus }