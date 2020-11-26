const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crete Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: false,
  },
  pending: [
    {
      JobId: {
        type: String,
        required: true,
      },
      JobName: {
        type: String,
        required: true,
      },
      JobDetail: {
        type: String,
        required: true,
      },
      JobOwner: {
        type: String,
        required: true,
      },
      Wages: {
        type: Number,
        required: true,
      },
      Amount: {
        type: Number,
        required: true,
      },
      Location: {
        type: String,
        required: true,
      },
      BeginTime: {
        type: String,
        required: true,
      },
      EndTime: {
        type: String,
        required: true,
      },
    },
  ],
  inprogress: [
    {
      JobId: {
        type: String,
        required: true,
      },
      JobName: {
        type: String,
        required: true,
      },
      JobDetail: {
        type: String,
        required: true,
      },
      JobOwner: {
        type: String,
        required: true,
      },
      Wages: {
        type: Number,
        required: true,
      },
      Amount: {
        type: Number,
        required: true,
      },
      Location: {
        type: String,
        required: true,
      },
      BeginTime: {
        type: String,
        required: true,
      },
      EndTime: {
        type: String,
        required: true,
      },
    },
  ],
  cancel: [
    {
      JobId: {
        type: String,
        required: true,
      },
      JobName: {
        type: String,
        required: true,
      },
      JobDetail: {
        type: String,
        required: true,
      },
      JobOwner: {
        type: String,
        required: true,
      },
      Wages: {
        type: Number,
        required: true,
      },
      Amount: {
        type: Number,
        required: true,
      },
      Location: {
        type: String,
        required: true,
      },
      BeginTime: {
        type: String,
        required: true,
      },
      EndTime: {
        type: String,
        required: true,
      },
    },
  ],
  approve: [
    {
      JobId: {
        type: String,
        required: true,
      },
      JobName: {
        type: String,
        required: true,
      },
      JobDetail: {
        type: String,
        required: true,
      },
      JobOwner: {
        type: String,
        required: true,
      },
      Wages: {
        type: Number,
        required: true,
      },
      Amount: {
        type: Number,
        required: true,
      },
      Location: {
        type: String,
        required: true,
      },
      BeginTime: {
        type: String,
        required: true,
      },
      EndTime: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = User = mongoose.model("Users", UserSchema, "Users");
