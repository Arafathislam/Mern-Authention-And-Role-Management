const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const number = process.env.SEND_NUMBER
const client = require('twilio')(accountSid, authToken);





// show dashboard
async function smsSend(data) {
  try {

    client.messages
    .create({
      body: data.msg,
      to: data.phn, // Text your number
      from: number, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));


  } catch (error) {
    return response(
      (error = true),
      (message = "SMS Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}

module.exports = {
  smsSend,
};
