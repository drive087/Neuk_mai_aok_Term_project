const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Crete Schema
const JobSchema = new Schema({
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
    required: true,
  },
});

module.exports = User = mongoose.model("Jobs", JobSchema, "Jobs");
