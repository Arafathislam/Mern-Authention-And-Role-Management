
const statusCode= require('../../core/status/statusCode.js')

const {
  allSale,
  add,
  singleSale,
  productSale,
  dailySale,
  getDaily,
  getProduct,
  getMonthly,
  }=require('../../core/services/sales/sales.js');
const { query } = require('express');



const createErrorMessage = () => {
  return {
    status: "",
    data: null,
    error: false,
    message: "",
  };
};



//  add seles or register
async function addSale(req, res) {

try{
  let response = await add(req.body);

  return res.status(200).send(response);

}catch(err){

  console.log(err);
  let newError = createErrorMessage();
  newError.status = statusCode.internalServerError;
  newError.message = "Sales Control Service Internal Server Error";
  return res.status(statusCode).send(newError);

}




}

//get all sales

async function getAllSale(req, res) {
  try{

    let response = await allSale(query);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}

// get single sale

async function getSingleSale(req, res) {
  try{
    let response = await singleSale(req.params);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}


// create sale

async function createProductSale(req, res) {
  try{
    let response = await productSale(req.body);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}

// create daily sale

async function createDailySale(req, res) {
  try{
    let response = await dailySale(req.body);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}



// get daily sale
async function getDailySale(req, res) {
  try{
    let response = await getDaily(req.body);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}

//get product sale


async function getProductSale(req, res) {
  try{
    let response = await getProduct(req.body);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}

// get monthly sale
async function getMonthlySale(req, res) {
  try{
    let response = await getMonthly(req.body);
    return res.status(200).send(response);
  
  }catch(err){
  
    console.log(err);
    let newError = createErrorMessage();
    newError.status = statusCode.internalServerError;
    newError.message = "Sales Control Service Internal Server Error";
    return res.status(statusCode).send(newError);
  
  }
}







module.exports= {
  getAllSale,
  addSale,
  getSingleSale,
  createProductSale,
  createDailySale,
  getDailySale,
  getProductSale,
  getMonthlySale


};
