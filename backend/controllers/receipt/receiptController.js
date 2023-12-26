
const statusCode= require('../../core/status/statusCode')
const { allReceipt,
  singleReceipt,
  create,
  recieptByDate
  }=require('../../core/services/receipt/receipt.js')


  const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };

async function getAllReceipt(req, res) {
  try {
    let data=req.query
    let response = await allReceipt(data);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Receipt Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}


//get single receipt

async function getSingleReceipt(req,res){
  try {
    let response = await singleReceipt(req.params);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Receipt Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

// create receipt

async function createReceipt(req,res){
  try {
    let response = await create(req.body);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Receipt Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

//finding receipt by date 

async function getRecieptByDate(req, res) {
  try {
    let response = await recieptByDate(req.body);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Receipt Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
  }



module.exports= {
    getAllReceipt,
    getSingleReceipt,
    createReceipt,
    getRecieptByDate
}

