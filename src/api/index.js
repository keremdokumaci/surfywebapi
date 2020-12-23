var signin = require('./SigninController/SigninController');
var signup = require('./SignupController/SignupController');
var chatroom = require('./ChatroomController/ChatroomController');

const CatchAllCalls = (app) => {
    app
        .route('/login')
        .post(signin.login);

    app
        .route('/signup')
        .post(signup.createUser)

    app
        .route('/chatroom')
        .post(chatroom.create)
    
    app
        .route('/chatroom')
        .get(chatroom.get)

    app
        .route('/chatroom/:roomId')
        .get(chatroom.getById)
    
    
}

module.exports = CatchAllCalls;