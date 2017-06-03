const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userFileSchema = new Schema({
  email: String,
  fileid: {
    type: String,
    unique: [true, 'File id should be unique']
  },
  path:{
    type: String,
    required: [true, 'File path is a required value']
  },
  processed: {
    type: String,
    default: "uploaded",
    enum: [
      "uploaded",
      "processed"
    ]
  },
  output: {
    table: {
      headers: [String],
      values: [Array]
    },
    classification: {
      type: String,
      enum: [
        'deviation',
        'well header',
        'cuttings',
        'core analysis',
        'fifth category'
      ]
    }
  }
});

const UserFile = mongoose.model('userfile', userFileSchema);

module.exports = UserFile;
