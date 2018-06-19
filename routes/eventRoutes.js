const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const requireLogin = require('../middlewares/requireLogin')
const Mailer = require('../services/Mailer')
const eventTemplate = require('../services/eventTemplate')

//schemas
const EventSchema = mongoose.model('Event')
const UserInfoSchema = mongoose.model('UserInfo')

//iamge upload
const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')});

module.exports = app => {

    app.get('/api/event', (req, res) => {
        EventSchema.find()
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).send(err))
    });

    app.get('/api/event/:id', requireLogin, (req, res) => {
        const { id } = req.params
        EventSchema.find({ _id: id })
            .populate('joined', ['username', 'currentState', 'studying', 'school', 'email']).exec()
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).send(err))
    });

    app.post('/api/Event', requireLogin, upload.single('image') , async (req, res) => {
        const { school, title, body, location, date, image } = req.body;
        const {filename} = req.file;
        try {
            const event = await new EventSchema({
                school,
                title,
                body,
                location,
                date,
                image: `/uploads/${filename}`,
                posted: Date.now(),
                _user: req.user._userInfo
            });
            const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo });
            //push the req.userInfo(who created event) into an joined array as an joined member
            event.joined.push(req.user._userInfo);
            event._creator = req.user._userInfo;
            event.save();

            //creator also gets event data inside userInfo
            userInfo.event.push(event._id);
            userInfo.save();

            res.status(201).json(event)
        } catch (err) {
            res.status(500).send(err)
        }

    })

    app.post('/api/event/join/:id', requireLogin, async (req, res) => {
        const { id } = req.params;
        try {
            const event = await EventSchema.findById({ _id: id });
            const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo });

            //push userInfo into event joined list
            event.joined.push(req.user._userInfo);
            event.save();

            //push event _id into 'userInfo event array'
            userInfo.event.push(event._id);
            userInfo.save();

            // //send event detail by email 
            // const mailer = new Mailer(event, req.user.email, eventTemplate(event));
            // mailer.send();

            res.status(201).json(event);
        } catch (err) {
            res.status(500).send(err)
        }
    });

    app.post('/api/event/quit/:id', requireLogin, async (req, res) => {
        try {
            const { id } = req.params;

            //pull out the req.user from joined list
            const event = await EventSchema.findById({ _id: id })
            event.joined.pull(req.user._userInfo)
            event.save()

            //pull out event from userInfo
            const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo })
            userInfo.event.pull(id)
            userInfo.save();

            res.status(201).json(event)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });

    //remove event from userInfo event list
    app.post('/api/event/remove/:id', requireLogin, async (req, res) => {
        const { id } = req.params;
        //pull out event from userInfo
        const userInfo = await UserInfoSchema.findById({ _id: req.user._userInfo })
            userInfo.event.pull(id)
            userInfo.save()
            .then(result => res.status(201).json(result))
            .catch(err => res.status(500).send(err))
    });

    app.post('/api/event/expired/:id', requireLogin, async (req, res) => {
        try {
            const { id } = req.params;
            const event = await EventSchema.findById({ _id: id })
            event.expired = !event.expired;
            event.save();
            res.status(201).json(event)
        }
        catch (err) {
            res.status(500).send(err)
        }
    });
}


