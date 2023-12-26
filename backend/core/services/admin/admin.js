const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
var UserMonitorModel=require('../../services/user/userMonitorModel.js')
var UserModel=require('../../services/user/userModel.js')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


// all user details


async function allUser(data) {

    try {
     
        const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;
  
        const skip = (page - 1) * limit;
  
        const query = UserModel.find({isAdmin:false,isDeleted:false});
        const total = (await UserModel.countDocuments({isAdmin:false,isDeleted:false}))
        const total_page=Math.ceil(total/limit);
  
        query.skip(skip).limit(limit);
  
        const results = await query.exec();
  
          finaldata={
            page,
            limit,
            total,
            results,
            total_page,
       
  
        }
        return response(
          (error=false),
          (message="Success"),
          finaldata,
          statusCode.accepted
  
      )
  
    } catch (err) {
      console.log(err)
      return response(
          (error = true),
          (message = "Admin Service  Internal Server Error"),
          (data = null),
          (httpStatus = statusCode.internalServerError)
        );
  
  }
  
  
  }
  

  // all user monitor 

  async function allUserMonitor(data) {

    try {
     
        const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;
  
        const skip = (page - 1) * limit;
  
        const query = UserMonitorModel.find({}).sort({_id: -1});
        const total = (await UserMonitorModel.countDocuments({}))
        const total_page=Math.ceil(total/limit);
  
        query.skip(skip).limit(limit);
  
        const results = await query.exec();
  
          finaldata={
            page,
            limit,
            total,
            results,
            total_page,
       
  
        }
        return response(
          (error=false),
          (message="Success"),
          finaldata,
          statusCode.accepted
  
      )
  
    } catch (err) {
      console.log(err)
      return response(
          (error = true),
          (message = "AdminMonitor Service  Internal Server Error"),
          (data = null),
          (httpStatus = statusCode.internalServerError)
        );
  
  }
  
  
  }

// delete user
  async function removeUser(data) {
    
    try {
        const idValue = data.id;
        const result = await UserModel.findByIdAndUpdate(idValue, { isDeleted: true })
        return response(
            (error=false),
            (message="Success"),
            (data = null),
            statusCode.success


        )

    } catch (error) {
        return response(
            (error = true),
            (message = "Admin Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
    }
}


// register admin

async function create(data) {
    try {
      // console.log("d",data);

        const { email,isAdmin, password, password_confirmation } = data;
     
      const isExitsUser = await UserModel.findOne({ email: email,isAdmin:true });
      // console.log("is",isExitsUser)
  
      if (isExitsUser) {
        
            return response(
                (error=false),
                (message=errorMessage.duplicateEmail),
                {},
                statusCode.notAcceptable
            )


      } else {

        if (email && isAdmin  && password && password_confirmation) {
          let salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hash(password, salt);
  
          if (password === password_confirmation) {
            let doc = new UserModel({
              email: email,
              password: hashPassword,
              isAdmin:isAdmin
            });
  
           let result= await doc.save();
          //  console.log("r",result);
  
     
  
            return response(
                (error=false),
                (message="Success"),
                {},
                statusCode.accepted

            )

          } else {
            return response(
                (error=false),
                (message="password and comfirm password doesnt match"),
                {},
                statusCode.notAcceptable
            )
          }
        } else {
            return response(
                (error=false),
                (message="All field required"),
                {},
                statusCode.notAcceptable
            )
        }
      }
    } catch (err) {
        return response(
            (error = true),
            (message = "Admin Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
    }
  }


 // Login user
  
 async function login(data) {
    try {
      const { email, password } = data;
  
      if (email && password) {
        let user = await UserModel.findOne({ email: email,isAdmin:true });
  
        if (user != null) {
          let isMatchPassword = await bcrypt.compare(password, user.password);
  
          if (user.email === email && isMatchPassword) {
            //Generate JWT Token
            let token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY2,
              { expiresIn: "4d" }
            );


            let loginDetails = {
             
                token:token
              };
            return response(
                (error=false),
                (message="Login Success"),
                loginDetails,
                statusCode.accepted

            )
          } else {
            return response(
                (error=false),
                (message="email and password doesnot match"),
                {},
                statusCode.notAcceptable
            )
          }
        } else {
            return response(
                (error=false),
                (message="admin are not register user"),
                {},
                statusCode.notAcceptable
            )
        }
      }
    } catch (err) {
      console.log(err);
      return response(
        (error = true),
        (message = "Admin Service Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );
    }
  }


  // change password
  async function changePass(data,user) {
    try {
      // console.log(data,"d");
      const { password, password_confirmation } = data;
  
      if (password && password_confirmation) {
        if (password === password_confirmation) {
          let salt = await bcrypt.genSalt(10);
          let newHashPassword = await bcrypt.hash(password, salt);
          // console.log("u",data.user);
  
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
         
          });
  
          return response(
            (error=false),
            (message="Password changed successfully"),
            {},
            statusCode.accepted

        )
        } else {
            return response(
                (error=false),
                (message="password and comfirmpassword doesnt match"),
                {},
                statusCode.notAcceptable
            )
        }
      } else {
        return response(
            (error=false),
            (message="All field required"),
            {},
            statusCode.notAcceptable
        )
      }
    } catch (err) {
      console.log(err);
      return response(
        (error = true),
        (message = "Admin Service Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );
    }
  }
  




  module.exports= {
    allUserMonitor,
    allUser,
    removeUser,
    create,
    login,
    changePass
}