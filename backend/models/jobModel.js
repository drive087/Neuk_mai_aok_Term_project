const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crete Schema
const JobSchema = new Schema({
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
  CurrentEmployee: [
    {
      userId: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      first_name: {
        type: String,
        required: false,
      },
      last_name: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
      },
      birthday: {
        type: String,
        required: false,
      },
    },
  ],
  CurrentAcceptedEmployee: [
    {
      userId: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      first_name: {
        type: String,
        required: false,
      },
      last_name: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
      },
      birthday: {
        type: String,
        required: false,
      },
    },
  ],
  Status: {
    type: String,
    required: false,
  },
});

module.exports = User = mongoose.model("Jobs", JobSchema, "Jobs");
