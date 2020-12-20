var db = require( '../../database/connection');

const create = (req,res,next) => {
    const chatroom = req.body;
    var chatrooms = db.ref("chatrooms");
    var ref = chatrooms.push();
    chatroom['roomId'] = ref.key.replace('-','');

    ref.set(chatroom)
        .then(() => {
            res.send(chatroom);
        });

}

module.exports = {create};