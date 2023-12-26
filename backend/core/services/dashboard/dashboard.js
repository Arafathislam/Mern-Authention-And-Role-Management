const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
var ProductModel = require("../product/productModel.js");
var StockModel = require("../../services/stock/stockModel.js");
var SaleModel  =require("../../services/sales/salesModel.js")

// show dashboard
async function dashChart(params) {
  try {
    let totalProduct = await ProductModel.countDocuments({});

    const totalStock = await StockModel.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          totalQuantity: { $sum: "$stockQuantity" },
        },
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
        },
      },
    ]);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todaySaleCount = await SaleModel.countDocuments({
      createdAt: {
        $gte: todayStart,
        $lt: todayEnd,
      },
    });

    const salesData = await SaleModel.find({}, 'productName salePrice costPrice createdAt');


    const processedData = salesData.reduce((acc, sale) => {
      const monthYear = sale.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
      const existingEntry = acc.find(entry => entry.x === monthYear);

      if (existingEntry) {
        existingEntry.y[0] += sale.salePrice; // Add sale price
        existingEntry.y[1] += sale.costPrice; // Add cost price
      } else {
        acc.push({
          x: monthYear,
          y: [sale.salePrice, sale.costPrice],
        });
      }

      return acc;
    }, []);

    

    const topStocks = await StockModel
    .find({isDeleted:false})
    .sort({ stockQuantity: -1 }) // Sort in descending order based on stockQuantity
    .limit(10);

    const productIds = topStocks.map(stock => stock.product_id);

    const p = await ProductModel.find({
      _id: { $in: productIds },
      isDeleted: false,
    });
    

    const result = topStocks.map(stock => {
      const correspondingProduct = p.find(product => product._id.toString() === stock.product_id.toString());
    
      return {
        stockQuantity: stock.stockQuantity,
        productName: correspondingProduct ? correspondingProduct.productName : 'Product Not Found',
      };
    });
    





    const products = await ProductModel.find({ isDeleted: false });

  

    let finaldata = {
      totalProduct,
      totalStock,
      todaySaleCount,
      result,
      processedData,
      products
    };

    return response(
      (error = false),
      (message = "Success"),
      finaldata,
      statusCode.accepted
    );
  } catch (error) {
    return response(
      (error = true),
      (message = "Dashboard Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}

module.exports = {
  dashChart,
};
