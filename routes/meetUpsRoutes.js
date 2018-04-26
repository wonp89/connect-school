const mongoose = require('mongoose');
// const multer = require('multer')
const path = require('path')
const requireLogin = require('../middlewares/requireLogin')
const Mailer = require('../services/Mailer')
const meetUpTemplate = require('../services/meetUpTemplate')

const MeetUpsSchema = mongoose.model('MeetUps')
const UserInfoSchema = mongoose.model('UserInfo')

// const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')})

module.exports = app => {

    app.get('/api/meetup', (req, res) => {
        MeetUpsSchema.find()
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).send(err))
    });

    app.get('/api/meetup/:id', requireLogin, (req, res) => {
        const { id } = req.params
        MeetUpsSchema.find({ _id: id })
            .populate('attending', ['username', 'currentState', 'studying', 'email']).exec()
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).send(err))
    });

    app.post('/api/meetup', requireLogin, async (req, res) => {
        const { school, title, body, location, date } = req.body;
        try {
            const meetups = await new MeetUpsSchema({
                school,
                title,
                body,
                location,
                date,
                posted: Date.now(),
                _user: req.user._userInfo
            });
            const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo });
            //push the req.userInfo(who created meetup) into an attending array as an attending member
            meetups.attending.push(req.user._userInfo);
            meetups._creator = req.user._userInfo;
            meetups.save();

            //creator also gets meetup data inside userInfo
            userInfo.meetUp.push(meetups._id);
            userInfo.save();

            res.status(201).json(meetups)
        } catch (err) {
            res.status(500).send(err)
        }

    })

    app.post('/api/meetup/join/:id', requireLogin, async (req, res) => {
        const { id } = req.params;
        try {
            const meetUp = await MeetUpsSchema.findById({ _id: id });
            const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo });

            //push userInfo into meetUp attending list
            meetUp.attending.push(req.user._userInfo);
            meetUp.save();

            //push meetup _id into 'userInfo meetup array'
            userInfo.meetUp.push(meetUp._id);
            userInfo.save();

            // //send meetup detail by email 
            // const mailer = new Mailer(meetUp, req.user.email, meetUpTemplate(meetUp));
            // mailer.send();

            res.status(201).json(meetUp);
        } catch (err) {
            res.status(500).send(err)
        }
    });

    app.post('/api/meetup/quit/:id', requireLogin, async (req, res) => {
        try {
            const { id } = req.params;

            //pull out the req.user from attending list
            const meetUp = await MeetUpsSchema.findById({ _id: id })
            meetUp.attending.pull(req.user._userInfo)
            meetUp.save()

            //pull out meetup from userInfo
            const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo })
            userInfo.meetUp.pull(id)
            userInfo.save();

            res.status(201).json(meetUp)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    app.post('/api/meetup/expired/:id', requireLogin, async (req, res) => {
        try {
            const { id } = req.params;
            const meetUp = await MeetUpsSchema.findById({ _id: id })
            meetUp.expired = !meetUp.expired;
            meetUp.save();
            res.status(201).json(meetUp)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });
}


