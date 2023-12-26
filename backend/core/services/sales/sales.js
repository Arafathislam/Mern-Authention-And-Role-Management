const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
var SaleModel=require('../../services/sales/salesModel.js')
var ProductModel=require('../../services/product/productModel.js')
var StockModel=require('../../services/stock/stockModel.js')
var SaleReport =require('../sales/dailySaleModel.js')
var ProductReport= require('../sales/productSaleModel.js')

//  add seles or register
async function add(data) {
 
  try {
    const { product_id, quantitySold, salePrice, productName } = data;
    const findData = await ProductModel.findById(product_id);
    const updateStock = await StockModel.findOne({ product_id: product_id });
    if (findData == undefined || findData == null) {
      
        return response(
            (error=false),
            (message="Product not exits"),
            {},
            statusCode.notAcceptable
        )
   
   
   
    }

    if (updateStock.stockQuantity >= quantitySold) {
      const saleData = new SaleModel({
        product_id: product_id,
        quantitySold: quantitySold,
        salePrice: salePrice,
        costPrice: findData.price,
        productName: productName,
      });
     let result= await saleData.save();

      updateStock.stockQuantity = updateStock.stockQuantity - quantitySold;
      await updateStock.save();

      return response(
        (error=false),
        (message="Success"),
        result,
        statusCode.created

    )
   




   
    } else {
        return response(
            (error=false),
            (message="stock is not avaliable"),
            {},
            statusCode.notAcceptable
        )
    }

    if (!updateStock.stockQuantity) {
      updateStock.isActive = false;
      await updateStock.save();
    }
  } catch (error) {
    return response(
        (error = true),
        (message = "Sales Service  Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );
}
}
//get all sales

async function allSale(data) {
 
  try {
    const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;

    const skip = (page - 1) * limit;

    const query = SaleModel.find({ isDeleted: false });
    const total = await SaleModel.countDocuments({});

    query.skip(skip).limit(limit);

    const results = await query.exec();

   let finaldata = {
      page,
      limit,
      total,
      results,
     
    };

    return response(
      (error=false),
      (message="Success"),
      finaldata,
      statusCode.accepted

  )
  } catch (error) {
    return response(
        (error = true),
        (message = "Sales Service  Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );
  }
}

// get single sale

async function singleSale(data) {
  
  try {
    // console.log(data)
    const idValue = data.id;
    let result = await SaleModel.findById(idValue, {
      isDeleted: false,
    });

    if (result == undefined || result == null) {
      return response(
        (error=false),
        (message="sales is not avaliable"),
        {},
        statusCode.notAcceptable
    )

      
    } else {
      return response(
        (error=false),
        (message="Success"),
        result,
        statusCode.accepted
  
    )
      
    }
  } catch (error) {
    return response(
        (error = true),
        (message = "Sales Service  Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );
  }
}







// create daily sale


async function dailySale(data) {
  try {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let nextDate = day + 1;

    let total_sale = await SaleReport.find({
      isDeleted: false,
      date: {
        $gte: new Date(`${year}-${month}-${day}`),
        $lt: new Date(`${year}-${month}-${nextDate}`),
      },
    });

    if (total_sale.length === 0) {
      
      const totalSalePrice = data.quantitySold * data.salePrice;
      const totalCostPrice = data.quantitySold * data.costPrice;
      const profitOrLoss = totalSalePrice - totalCostPrice;

      const profit = profitOrLoss > 0 ? profitOrLoss : 0;
      const loss = profitOrLoss < 0 ? profitOrLoss : 0;

      const newSale = new SaleReport({
        date: new Date(),
        totalSalePrice: totalSalePrice,
        totalCostPrice: totalCostPrice,
        totalUnitsSold: data.quantitySold,
        totalProfit: profit,
        totalLoss: loss * -1,
      });

      await newSale.save();
    } else {
      

      const totalSalePrice = data.quantitySold * data.salePrice;
      const totalCostPrice = data.quantitySold * data.costPrice;
      const profitOrLoss = totalSalePrice - totalCostPrice;
      const profit = profitOrLoss > 0 ? profitOrLoss : 0;
      const loss = profitOrLoss < 0 ? profitOrLoss : 0;

      const updatedData = {
        totalSalePrice: total_sale[0].totalSalePrice + totalSalePrice,
        totalCostPrice: total_sale[0].totalCostPrice + totalCostPrice,
        totalUnitsSold: total_sale[0].totalUnitsSold + data.quantitySold,
        totalProfit: total_sale[0].totalProfit + profit,

        totalLoss: total_sale[0].totalLoss + -loss,
      };

      await SaleReport.findByIdAndUpdate(
        total_sale[0]._id,
        updatedData,

        {
          new: true,
        }
      );
    }

    return response(
      (error=false),
      (message="Success"),
      {},
      statusCode.created

  )
  } catch (err) {
    console.log(err);

    return response(
      (error = true),
      (message = "Sales Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}




// get daily sale
async function getDaily(data) {
  const { date } = data;

  try {
    const productReport = await ProductReport.find({ isDeleted: false });

    const filterData = productReport.filter(
      (dt) =>
        new Date(dt.date).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );

    const totalSalePrice = filterData.reduce(
      (prev, next) => prev + next.totalSalePrice,
      0
    );

    const totalCostPrice = filterData.reduce(
      (prev, next) => prev + next.totalCostPrice,
      0
    );

    const totalUnitsSold = filterData.reduce(
      (prev, next) => prev + next.totalUnitsSold,
      0
    );
    const totalProfit = filterData.reduce(
      (prev, next) => prev + next.totalProfit,
      0
    );
    const totalLoss = filterData.reduce(
      (prev, next) => prev + next.totalLoss,
      0
    );

    let data = {
      date: new Date(date),
      totalSalePrice,
      totalCostPrice,
      totalUnitsSold,
      totalProfit,
      totalLoss,
      products: filterData,
    };

    return response(
      (error=false),
      (message="Success"),
      data,
      statusCode.accepted

  )
  } catch (err) {
    console.log(err)
    return response(
        (error = true),
        (message = "Sales Service  Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );
}


}
// create product sale


async function productSale(data) {
  try {
    const products = await ProductModel.find({ isDeleted: false });
    const pdReport = await ProductReport.find({ isDeleted: false });

    const filterPdSale = pdReport.filter(
      (dt) =>
        new Date(dt.date).toLocaleDateString() ===
        new Date().toLocaleDateString()
    );

    if (filterPdSale.length > 0) {
      const findProduct = filterPdSale.find(
        (pdSale) => pdSale.product_id.toString() === data.product_id.toString()
      );

      if (findProduct) {
        const totalSalePrice = data.quantitySold * data.salePrice;
        const totalCostPrice = data.quantitySold * data.costPrice;
        const profitOrLoss = totalSalePrice - totalCostPrice;
        const profit = profitOrLoss > 0 ? profitOrLoss : 0;
        const loss = profitOrLoss < 0 ? profitOrLoss : 0;
        const updatedData = {
          totalSalePrice: findProduct.totalSalePrice + totalSalePrice,
          totalCostPrice: findProduct.totalCostPrice + totalCostPrice,
          totalUnitsSold: findProduct.totalUnitsSold + data.quantitySold,
          totalProfit: findProduct.totalProfit + profit,

          totalLoss: findProduct.totalLoss + -loss,
        };

        await ProductReport.findByIdAndUpdate(
          findProduct._id,
          updatedData,

          {
            new: true,
          }
        );
      } else {
        const productId = data.product_id.toString();
        let pd = {};
        pd = products.find((dt) => dt._id.toString() === productId);

        const totalSalePrice = data.quantitySold * data.salePrice;
        const totalCostPrice = data.quantitySold * data.costPrice;
        const profitOrLoss = totalSalePrice - totalCostPrice;

        const profit = profitOrLoss > 0 ? profitOrLoss : 0;
        const loss = profitOrLoss < 0 ? profitOrLoss : 0;

        const newSale = new ProductReport({
          date: new Date(),
          product_id: data.product_id,
          productName: pd.productName,
          totalSalePrice: totalSalePrice,
          totalCostPrice: totalCostPrice,
          totalUnitsSold: data.quantitySold,
          totalProfit: profit,
          totalLoss: -loss,
        });
        await newSale.save();
      }
    } else {
      const productId = data.product_id.toString();
      let pd = {};
      pd = products.find((dt) => dt._id.toString() === productId);

      const totalSalePrice = data.quantitySold * data.salePrice;
      const totalCostPrice = data.quantitySold * data.costPrice;
      const profitOrLoss = totalSalePrice - totalCostPrice;

      const profit = profitOrLoss > 0 ? profitOrLoss : 0;
      const loss = profitOrLoss < 0 ? profitOrLoss : 0;

      const newSale = new ProductReport({
        date: new Date(),
        product_id: data.product_id,
        productName: pd.productName,
        totalSalePrice: totalSalePrice,
        totalCostPrice: totalCostPrice,
        totalUnitsSold: data.quantitySold,
        totalProfit: profit,
        totalLoss: -loss,
      });
      await newSale.save();
    }
    return response(
      (error=false),
      (message="Success"),
      {},
      statusCode.created

  )
  } catch (err) {

    console.log(err)
    return response(
      (error = true),
      (message = "Sales Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}




//get product sale

async function getProduct(data) {
  const { date } = data;

  try {
    const productReport = await ProductReport.find({ isDeleted: false });

    const filterData = productReport.filter(
      (dt) =>
        new Date(dt.date).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );
    console.log(filterData);

    const totalSalePrice = filterData.reduce(
      (prev, next) => prev + next.totalSalePrice,
      0
    );
    console.log(totalSalePrice);

    const totalCostPrice = filterData.reduce(
      (prev, next) => prev + next.totalCostPrice,
      0
    );

    const totalUnitsSold = filterData.reduce(
      (prev, next) => prev + next.totalUnitsSold,
      0
    );
    const totalProfit = filterData.reduce(
      (prev, next) => prev + next.totalProfit,
      0
    );
    const totalLoss = filterData.reduce(
      (prev, next) => prev + next.totalLoss,
      0
    );

    let data = {
      date: new Date(date),
      totalSalePrice,
      totalCostPrice,
      totalUnitsSold,
      totalProfit,
      totalLoss,
      products: filterData,
    };

     return response(
      (error=false),
      (message="Success"),
      data,
      statusCode.accepted

  )
  } catch (err) {
    console.log(err);
    return response(
      (error = true),
      (message = "Sales Service  Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
  }



// get monthly sale



async function getMonthly(data) {
  try {
    const { date } = data;
    const monthYear = new Date(date);
    const pdReport = await ProductReport.find({ isDeleted: false });
    const products = await ProductModel.find({ isDeleted: false });

    const filterData = pdReport.filter((dt) => {
      const reportDate = new Date(dt.date);
      return (
        reportDate.getMonth() === monthYear.getMonth() &&
        reportDate.getFullYear() === monthYear.getFullYear()
      );
    });

    const monthlySalesData = {};

    filterData.forEach((sale) => {
      const productId = sale.product_id.toString();
      const pdName = products.find((dt) => dt._id.toString() === productId);

      if (!monthlySalesData[monthYear.getMonth()]) {
        monthlySalesData[monthYear.getMonth()] = {
          month: monthYear.getMonth() + 1,
          totalSalePrice: 0,
          totalCostPrice: 0,
          totalUnitsSold: 0,
          totalProfit: 0,
          totalLoss: 0,
          products: {},
        };
      }

      const monthData = monthlySalesData[monthYear.getMonth()];

      monthData.totalSalePrice += sale.totalSalePrice;
      monthData.totalCostPrice += sale.totalCostPrice;
      monthData.totalUnitsSold += sale.totalUnitsSold;
      monthData.totalProfit += sale.totalProfit;
      monthData.totalLoss += sale.totalLoss;

      if (!monthData.products[productId]) {
        monthData.products[productId] = {
          product_id: productId,
          productName: pdName ? pdName.productName : 'Product Name Not Found',
          totalSalePrice: 0,
          totalCostPrice: 0,
          totalUnitsSold: 0,
          totalProfit: 0,
          totalLoss: 0,
        };
      }

      const productData = monthData.products[productId];

      productData.totalSalePrice += sale.totalSalePrice;
      productData.totalCostPrice += sale.totalCostPrice;
      productData.totalUnitsSold += sale.totalUnitsSold;
      productData.totalProfit += sale.totalProfit;
      productData.totalLoss += sale.totalLoss;
    });

    const monthlySales = Object.values(monthlySalesData);

    return response(
      (error = false),
      (message = "Success"),
      monthlySales,
      statusCode.accepted
    );
  } catch (err) {
    console.log(err);

    return response(
      (error = true),
      (message = "Sales Service Internal Server Error"),
      (data = null),
      (httpStatus = statusCode.internalServerError)
    );
  }
}












 module.exports = {
  allSale,
  add,
  singleSale,
  productSale,
  dailySale,
  getDaily,
  getProduct,
  getMonthly,
};
