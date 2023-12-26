const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
var UserModel = require('./userModel.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var transporter = require('../../../database/config/emailConfig.js');
const dotenv = require("dotenv");
const UserMonitorModel = require("./userMonitorModel.js");
const asyncHandler = require('express-async-handler')
dotenv.config();




async function create(data) {
  try {
    // console.log("d",data);

    const { username, password, password_confirmation, roles } = data;

    const isExitsUser = await UserModel.findOne({ username: username });

    if (isExitsUser) {

      return response(
        (error = false),
        (message = errorMessage.duplicateUniqueName),
        {},
        statusCode.notAcceptable
      )


    } else {

      if (username && password && password_confirmation && roles) {
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);

        if (password === password_confirmation) {
          let doc = new UserModel({
            username: username,
            password: hashPassword,
            roles: roles
          });

          let result = await doc.save();
          //  console.log("r",result);



          return response(
            (error = false),
            (message = "Success"),
            {},
            statusCode.accepted

          )

        } else {
          return response(
            (error = false),
            (message = "password and comfirmpassword doesnt match"),
            {},
            statusCode.notAcceptable
          )
        }
      } else {
        return response(
          (error = false),
          (message = "All field required"),
          {},
          statusCode.notAcceptable
        )
      }
    }
  } catch (err) {
    return response(
      (error = true),
      (message = "User Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}


// Login user

async function login(data, req, res) {
  try {
    const { username, password } = data;

    if (username && password) {
      let user = await UserModel.findOne({ username: username });

      if (user != null) {
        let isMatchPassword = await bcrypt.compare(password, user.password);

        if (user.username === username && isMatchPassword) {

          //Generate JWT Token



          const accessToken = jwt.sign(
            {
              "UserInfo": {
                "username": user.username,
                "roles": user.roles
              }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
          )

          const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
          )

          // Create secure cookie with refresh token 
          res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
          })

          // Send accessToken containing username and roles 


          return response(
            (error = false),
            (message = "Success"),
            { accessToken },
            statusCode.accepted

          )




        } else {
          return response(
            (error = false),
            (message = "username and password doesnot match"),
            {},
            statusCode.notAcceptable
          )
        }
      } else {
        return response(
          (error = false),
          (message = "user are not register user"),
          {},
          statusCode.notAcceptable
        )
      }
    }
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}

// change password

async function changePass(data, user) {
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
          (error = false),
          (message = "Password changed successfully"),
          {},
          statusCode.accepted

        )
      } else {
        return response(
          (error = false),
          (message = "password and comfirmpassword doesnt match"),
          {},
          statusCode.notAcceptable
        )
      }
    } else {
      return response(
        (error = false),
        (message = "All field required"),
        {},
        statusCode.notAcceptable
      )
    }
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}

// user profile or login user data

async function logged(data) {

  try {
    if (data) {
      let result = data;
    }

    return response(
      (error = false),
      (message = "Success"),
      data,
      statusCode.accepted

    )

  } catch (err) {
    console.log(err)
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }


}

// send reset password email


async function resetEmail(data) {

  try {

    const { email } = data

    if (email) {
      let user = await UserModel.findOne({ email: email })

      if (user) {
        let secret = user._id + process.env.JWT_SECRET_KEY

        let token = jwt.sign({ userId: user._id }, secret, { expiresIn: '15m' })
        let link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
        console.log(link)

        // send email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "SuperShop - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`

        })

        return response(
          (error = false),
          (message = "Password reset email send check you email ..."),
          statusCode.accepted

        )



      } else {
        return response(
          (error = false),
          (message = "Email is not valid"),
          {},
          statusCode.notAcceptable
        )
      }



    } else {
      return response(
        (error = false),
        (message = "Email required"),
        {},
        statusCode.notAcceptable
      )
    }


  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }

}




async function resetPassword(data, params) {

  try {
    const { password, password_confirmation } = data
    const { id, token } = params
    let user = await UserModel.findById(id)
    let new_secret = user._id + process.env.JWT_SECRET_KEY

    jwt.verify(token, new_secret)

    if (password && password_confirmation) {

      if (password === password_confirmation) {
        let salt = await bcrypt.genSalt(10);
        let newHashPassword = await bcrypt.hash(password, salt);
        // console.log("u",req.user);

        await UserModel.findByIdAndUpdate(user._id, {
          $set: { password: newHashPassword },
        });


        return response(
          (error = false),
          (message = "password Reset successfully"),
          statusCode.accepted

        )


      } else {
        return response(
          (error = false),
          (message = "password and comfirmpassword doesnt match"),
          {},
          statusCode.notAcceptable
        )
      }



    } else {
      return response(
        (error = false),
        (message = "All field required"),
        {},
        statusCode.notAcceptable
      )
    }


  } catch (err) {
    console.log(err)
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }



}


// refresh token validatior



async function refresh(data, req, res) {
  try {
    const cookies = data;

    if (!cookies?.jwt) {
      return response(
        (error = true),
        (message = "Unauthorized"),
        {},
        statusCode.unAuthorized
      );
    }

    const refreshToken = cookies.jwt;

    // Wrap jwt.verify in a promise
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    if (!cookies?.jwt) {
      return response(
        (error = true),
        (message = "Forbidden"),
        {},
        statusCode.forbidden
      );
    }

    let user = await UserModel.findOne({ username: decoded.username }).exec();

    if (!user) {
      return response(
        (error = true),
        (message = "Unauthorized"),
        {},
        statusCode.unAuthorized
      );
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          roles: user.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    console.log("Acc", accessToken);

    // Return response
    return response(
      (error = false),
      (message = "Success"),
      { accessToken },
      statusCode.accepted
    );
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}




// logout



async function logout(data,req,res) {

  try {

    const cookies = data


    if (!cookies?.jwt) {

      return response(
        (error = true),
        (message = "No Content"),
        {},
        statusCode.noContent
      )


    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })


    return response(
      (error = true),
      (message = "Cookie cleared"),
      {},
      statusCode.success
    )





  } catch (err) {
    console.log(err)
    return response(
      (error = true),
      (message = "User Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }



}








module.exports = {
  create,
  logged,
  changePass,
  resetEmail,
  resetPassword,
  login,
  refresh,
  logout



};

