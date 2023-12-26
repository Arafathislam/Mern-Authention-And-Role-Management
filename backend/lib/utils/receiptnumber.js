function generateRecieptNumber() {
    var value = "RRT";
    var timestamp = Date.now();
    var randomDigits = Math.floor(Math.random() * 100);
  
    return value + timestamp + randomDigits;
  }
  
  module.exports = generateRecieptNumber;
  