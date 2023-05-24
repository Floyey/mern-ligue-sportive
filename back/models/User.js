import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'customer'
  }
});

const User = mongoose.model('User', userSchema);

export default User;
