const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    school: String,
    title: String,
    body: String,
    location: String,
    createdBy: String,
    date: Date,
    expired: { type: Boolean, default: false },
    joined: [{type: Schema.Types.ObjectId, ref: 'UserInfo'}],   
    posted: Date,
    _creator: { type: Schema.Types.ObjectId, ref: 'UserInfo' }
});

mongoose.model('Event', EventSchema);
