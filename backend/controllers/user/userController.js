
const statusCode= require('../../core/status/statusCode')
const {create,
  logged,
  changePass,
  resetEmail,
  resetPassword,
  refresh,
  logout,
  login}=require('../../core/services/user/user.js')



  const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };


async function addUser(req, res) {
  try {
    let response = await create(req.body);
    console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

// Login user

async function userLogin(req, res) {
  try {
    let userAgent = req.useragent;
     let loginTime = new Date();

    let response = await login(req.body,req,res);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

// change password

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
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}

// user profile or login user data

async function loggedUser(req, res) {

try{
  const data=req.user

   

}catch(err){
    console.log(err)
}


}

// send reset password email


async function sendResetEmail(req,res){

    try{

        const {email}=req.body

    


    }catch(err){
        console.log(err);
    }

}




async function passwordReset(req,res){

    try{
        const {password,password_confirmation}=req.body
        const {id,token}=req.params
        

 


    }catch(err){
        console.log(err)
    }



}




async function refreshToken(req, res) {
  try {
   
    // console.log("At",req.cookies);
    let response = await refresh(req.cookies,req,res);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}



async function logOut(req, res) {
  try {
   

    let response = await logout(req.cookies,req,res);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "User Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }
}



module.exports = {
 addUser,
 loggedUser,
 changePassword,
 sendResetEmail,
 passwordReset,
 userLogin,
 refreshToken,
 logOut
};

