const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInfoSchema = new Schema({
  username: String,
  currentState: String,
  studying: String,
  email: String,
  meetUp: [{type: Schema.Types.ObjectId, ref: 'MeetUps'}],
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('UserInfo', UserInfoSchema);
