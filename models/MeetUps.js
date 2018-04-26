const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetUpsSchema = new Schema({
    school: String,
    title: String,
    body: String,
    location: String,
    createdBy: String,
    date: Date,
    expired: { type: Boolean, default: false },
    attending: [{type: Schema.Types.ObjectId, ref: 'UserInfo'}],   
    posted: Date,
    _creator: { type: Schema.Types.ObjectId, ref: 'UserInfo' }
});

mongoose.model('MeetUps', MeetUpsSchema);
