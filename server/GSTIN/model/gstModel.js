const mongoose = require("mongoose");

const gstSchema = new mongoose.Schema({
  email: { type: String, required: true },
  gstin: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  registrationdate: { type: String, required: true },
  status: { type: String, required: true },
  lastupdate: { type: String, required: true }
});

module.exports = mongoose.model("GST", gstSchema);
