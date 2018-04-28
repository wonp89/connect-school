const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
require('./models/User');
require('./services/passport');
require('./models/UserInfo')
require('./models/Event')

mongoose.connect(keys.mongoURI)

const app = express();
app.use(bodyParser.json())
app.use (
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/userInfoRoutes')(app);
require('./routes/EventRoutes')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT);

