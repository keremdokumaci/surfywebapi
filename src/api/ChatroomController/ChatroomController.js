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

const get = (req,res,next) => {
    var chatrooms = db.ref("chatrooms");

    chatrooms.once('value', 
    (snapshot) => {
        res.status(200).json({chatrooms:snapshot.val()});
    },
    (err) => {
        console.log(err);
    }
    )
}

module.exports = {create, get};