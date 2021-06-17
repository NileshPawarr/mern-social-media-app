const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

UserSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.updatedAt;
  return userObject;
};

module.exports = mongoose.model('User', UserSchema);
