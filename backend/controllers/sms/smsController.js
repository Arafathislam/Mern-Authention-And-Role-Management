
const statusCode= require('../../core/status/statusCode')
const {
    smsSend
  }=require('../../core/services/sms/sms')


  const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };



async function sendSmsClient(req, res) {

  try {
  let data=req.body;
    let response = await smsSend(data);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "SMS Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}










module.exports= {
  sendSmsClient
   

}