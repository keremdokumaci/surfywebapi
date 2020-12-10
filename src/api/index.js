var signin = require('./SigninController/SigninController');

const CatchAllCalls = (app) => {
    app.use('/signin',signin);
}

module.exports = CatchAllCalls;