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
        required: false,
      },
      JobName: {
        type: String,
        required: false,
      },
      JobDetail: {
        type: String,
        required: false,
      },
      JobOwner: {
        type: String,
        required: false,
      },
      Wages: {
        type: Number,
        required: false,
      },
      Amount: {
        type: Number,
        required: false,
      },
      Location: {
        type: String,
        required: false,
      },
      BeginTime: {
        type: String,
        required: false,
      },
      EndTime: {
        type: String,
        required: false,
      },
    },
  ],
  inprogress: [
    {
      JobId: {
        type: String,
        required: false,
      },
      JobName: {
        type: String,
        required: false,
      },
      JobDetail: {
        type: String,
        required: false,
      },
      JobOwner: {
        type: String,
        required: false,
      },
      Wages: {
        type: Number,
        required: false,
      },
      Amount: {
        type: Number,
        required: false,
      },
      Location: {
        type: String,
        required: false,
      },
      BeginTime: {
        type: String,
        required: false,
      },
      EndTime: {
        type: String,
        required: false,
      },
    },
  ],
  cancel: [
    {
      JobId: {
        type: String,
        required: false,
      },
      JobName: {
        type: String,
        required: false,
      },
      JobDetail: {
        type: String,
        required: false,
      },
      JobOwner: {
        type: String,
        required: false,
      },
      Wages: {
        type: Number,
        required: false,
      },
      Amount: {
        type: Number,
        required: false,
      },
      Location: {
        type: String,
        required: false,
      },
      BeginTime: {
        type: String,
        required: false,
      },
      EndTime: {
        type: String,
        required: false,
      },
    },
  ],
  approve: [
    {
      JobId: {
        type: String,
        required: false,
      },
      JobName: {
        type: String,
        required: false,
      },
      JobDetail: {
        type: String,
        required: false,
      },
      JobOwner: {
        type: String,
        required: false,
      },
      Wages: {
        type: Number,
        required: false,
      },
      Amount: {
        type: Number,
        required: false,
      },
      Location: {
        type: String,
        required: false,
      },
      BeginTime: {
        type: String,
        required: false,
      },
      EndTime: {
        type: String,
        required: false,
      },
    },
  ],
  done: [
    {
      JobId: {
        type: String,
        required: false,
      },
      JobName: {
        type: String,
        required: false,
      },
      JobDetail: {
        type: String,
        required: false,
      },
      JobOwner: {
        type: String,
        required: false,
      },
      Wages: {
        type: Number,
        required: false,
      },
      Amount: {
        type: Number,
        required: false,
      },
      Location: {
        type: String,
        required: false,
      },
      BeginTime: {
        type: String,
        required: false,
      },
      EndTime: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = User = mongoose.model("Users", UserSchema, "Users");
