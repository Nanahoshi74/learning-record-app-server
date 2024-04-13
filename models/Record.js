const { Schema, default: mongoose } = require("mongoose");

const RecordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    memo: {
      type: String,
      max: 100,
    },
    graph: {
      type: String,
    },
    date: {
      type: String,
    },
    studyTime: {
      type: Object,
      default: {},
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Record", RecordSchema);
