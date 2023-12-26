
const statusCode= require('../../core/status/statusCode')
const { allUserMonitor,allUser, removeUser, create,
  login,
  changePass
  
  }=require('../../core/services/admin/admin')


  const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };


  // user monitor details
async function getAllUserMonitor(req, res) {
  try {
    let data=req.query
    let response = await allUserMonitor(data);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "AdminMonitor Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}


  // user monitor details
  async function getAllUser(req, res) {
    try {
      let data=req.query
      let response = await allUser(data);
      // console.log("r",response);
      return res.status(200).send(response);
    
    } catch (err) {
      console.log(err);
      let newError = createErrorMessage();
      newError.status = statusCode.internalServerError;
      newError.message = "Admin Control Service Internal Server Error";
      return res.status(statusCode).send(newError);
    }
  
  
  }



  // Delete User by Id

async function deleteUser(req, res) {

  try {
    let response = await removeUser(req.params);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Admin Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}


// create admin

async function addAdmin(req, res) {
  try {
    let response = await create(req.body);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Admin Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

// Login admin

async function adminLogin(req, res) {
  try {
   
    let response = await login(req.body);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Admin Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

// admin change password

async function changePassword(req, res) {
  try {
    let user=req.user;

    // console.log("user",user);
    let response = await changePass(req.body,user);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Admin Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}










module.exports= {
 getAllUserMonitor,
 getAllUser,
 deleteUser,
 addAdmin,
 adminLogin,
 changePassword
    
}