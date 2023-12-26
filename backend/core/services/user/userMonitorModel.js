var mongoose = require('mongoose');

// Define Schema
var userSchema = new mongoose.Schema({
  username: { type: String, require: false, trim: true ,default:''},
  browser: { type: String, require: false, trim: true,default:'' },
  version: { type: String, require: false, trim: true ,default:''},
  os: { type: String, require: false, trim: true,default:'' },
  platform: { type: String, require: false, trim: true ,default:''},
  isMobile: {  type: Boolean, require: false, default:false },
  isDesktop: {   type: Boolean, require: false ,default:false},
  isBot: { type: String, require: false, trim: true,default:'' },
  loginTime: { type: String, require: false, trim: true ,default:''},
  

}, {
  timestamps: true,
});

// Create Model
var UserMonitorModel = mongoose.model("usermonitor", userSchema);

module.exports = UserMonitorModel;
