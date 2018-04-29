const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInfoSchema = new Schema({
  username: String,
  currentState: String,
  studying: String,
  school: String,
  email: String,
  event: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('UserInfo', UserInfoSchema);
