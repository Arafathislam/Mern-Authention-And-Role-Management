
const statusCode= require('../../core/status/statusCode')
const {allProduct,
  singleProduct,
  create,
  update,
  remove,
  }=require('../../core/services/product/product.js')


  const createErrorMessage = () => {
    return {
      status: "",
      data: null,
      error: false,
      message: "",
    };
  };





// create product
async function createProduct(req, res) {
  
  try {
    let response = await create(req.body);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Product Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }




}

// show all product with pagination


async function getAllProduct(req, res) {

  try {
    // console.log("qc",req.query);
    let response = await allProduct(req.query);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Product Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}

// show single product by Id
async function getSingleProduct(req, res) {

  try {
    let response = await singleProduct(req.params);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Product Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }



}

// Update product by Id
async function updateProduct(req, res) {

  try {
    let response = await update(req.body,req.params);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Product Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}

// Delete Product by Id

async function deleteProduct(req, res) {

  try {
    let response = await remove(req.params);
    // console.log("r",response);
    return res.status(200).send(response);
  
  } catch (err) {
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Product Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  }


}



//  search product by product name





module.exports= {
    getAllProduct,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
   

}