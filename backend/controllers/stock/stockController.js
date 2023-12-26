
const statusCode= require('../../core/status/statusCode.js')
const {
    singleStock,
    allStock,
    add
    }=require('../../core/services/stock/stock.js')
// add stock






const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };
  
async function addStock(req,res){
    try {
        let response = await add(req.body);
        // console.log("r",response);
        return res.status(200).send(response);
      
      } catch (err) {
        console.log(err);
        let newError = createErrorMessage();
        newError.status = statusCode.internalServerError;
        newError.message = "Stock Control Service Internal Server Error";
        return res.status(statusCode).send(newError);
      }
}


// get single stock by id
async function getSingleStock(req,res){
    try {
        let response = await singleStock(req.params);
        // console.log("r",response);
        return res.status(200).send(response);
      
      } catch (err) {
        console.log(err);
        let newError = createErrorMessage();
        newError.status = statusCode.internalServerError;
        newError.message = "Stock Control Service Internal Server Error";
        return res.status(statusCode).send(newError);
      }

}
// get all stocks 

async function getAllStock(req,res){
    try {
        let response = await allStock(req.query);
        // console.log("r",response);
        return res.status(200).send(response);
      
      } catch (err) {
        console.log(err);
        let newError = createErrorMessage();
        newError.status = statusCode.internalServerError;
        newError.message = "Stock Control Service Internal Server Error";
        return res.status(statusCode).send(newError);
      }
}


module.exports= {
    getSingleStock,
    getAllStock,
    addStock
}
