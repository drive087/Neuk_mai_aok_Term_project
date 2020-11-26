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
        required: true,
      },
      email: {
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
        required: true,
      },
    },
  ],
  CurrentAcceptedEmployee: [
    {
      userId: {
        type: String,
        required: true,
      },
      email: {
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
        required: true,
      },
    },
  ],
  Status: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("Jobs", JobSchema, "Jobs");
