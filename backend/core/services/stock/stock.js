const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
var StockModel = require("./stockModel.js");

// add stock

async function add(data) {
  try {
    const { product_id, stockQuantity } = data;
    const stockData = await StockModel.findOne({ product_id: product_id });
    var quantity = parseInt(stockQuantity);
    if (!stockData) {
      return response(
        (error = false),
        (message = "Stock not exits"),
        {},
        statusCode.notAcceptable
      );
    } else {
      stockData.stockQuantity = stockData.stockQuantity + quantity;
      await stockData.save();

      if (stockData.stockQuantity > 0) {
        stockData.isActive = true;
        await stockData.save();
      }

      return response(
        (error = false),
        (message = "Success"),
        {},
        statusCode.created
      );
    }
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "Stock Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}

// get single stock by id
async function singleStock(params) {
  try {
    let productId = params.id;
    let result = await StockModel.findOne({ product_id: productId });
    if (result == undefined || result == null) {
      return response(
        (error = false),
        (message = "Stock not exits"),
        {},
        statusCode.notAcceptable
      );
    } else {
      return response(
        (error = false),
        (message = "Success"),
        result,
        statusCode.accepted
      );
    }
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "Stock Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}
// get all stocks

async function allStock(data) {
 
  try {
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    const skip = (page - 1) * limit;

    const query = StockModel.find({ isDeleted: false });
    const total = await StockModel.countDocuments({});

    query.skip(skip).limit(limit);
    const total_page=Math.ceil(total/limit);
    const result = await query.exec();

    let finaldata = {
      page,
      limit,
      total,
      result,
      total_page,
    };

    return response(
      (error = false),
      (message = "Success"),
      finaldata,
      statusCode.accepted
    );
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "Stock Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}

module.exports = {
  singleStock,
  allStock,
  add,
};
