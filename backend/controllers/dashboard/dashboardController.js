
const statusCode= require('../../core/status/statusCode')
const {
    dashChart
  }=require('../../core/services/dashboard/dashboard.js')


  const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };



async function getAllDashboard(req, res) {

  try {
 
    let response = await dashChart();
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Dashboard Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}










module.exports= {
    getAllDashboard
   

}