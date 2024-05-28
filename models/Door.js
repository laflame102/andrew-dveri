const mongoose = require("mongoose");

const doorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
});

const Door = mongoose.model("Door", doorSchema);

module.exports = Door;
