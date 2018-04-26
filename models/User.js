const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleID: String,
  email: String,
  _userInfo: { type: Schema.Types.ObjectId, ref: 'UserInfo' }
});

mongoose.model('User', UserSchema);



