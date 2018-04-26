const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')

const UserInfoSchema = mongoose.model('UserInfo')

module.exports = app => {

    app.get('/api/userInfo', requireLogin, (req, res) => {
        UserInfoSchema.findById({ _id: req.user._userInfo }).populate('meetUp', ['school', 'title', 'location', 'date']).exec()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).send(err))
    })

    app.post('/api/userInfo', requireLogin, async (req, res) => {
        const { currentState, username, studying } = req.body;
        try {
            const userInfo = new UserInfoSchema({
                currentState,
                username,
                studying,
                email: req.user.email,
                _user: req.user.id
            });
            const UserInfo = await userInfo.save();
            req.user._userInfo = UserInfo._id
            req.user.save()
            res.status(201).json(UserInfo)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    app.post('/api/userInfoEdit', requireLogin, (req, res) => {
        UserInfoSchema.findOneAndUpdate({ _user: req.user.id }, req.body)
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).send(err))
    })

}