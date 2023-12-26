const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
var ProductModel=require('../product/productModel.js')
var StockModel=require('../../services/stock/stockModel.js')



// create product
async function create(data) {
    
    try {

        const product=data.productName
        const result= await ProductModel.findOne({productName:product ,isDeleted: false });
        // console.log("heat1");

        if (result==undefined || result==null){
            const doc = new ProductModel(data)
            const newProduct = await doc.save()
            const newStock = new StockModel({
                product_id: newProduct._id,
              });
             let result=   await newStock.save();
            
            return response(
                (error=false),
                (message="Success"),
                result,
                statusCode.created

            )
        
        }else{
            return response(
                (error=false),
                (message="Product already exits"),
                {},
                statusCode.notAcceptable
            )
        }
  

    } catch (error) {
        return response(
            (error = true),
            (message = "Product Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );

    }
}

// show all product with pagination


async function allProduct(data) {
  
    try {
        // console.log("q",data.page);
        // console.log("l",data.limit);

        const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;

        const skip = (page - 1) * limit;

        const query = ProductModel.find({ isDeleted: false });
        const total = (await ProductModel.countDocuments({}))
        const total_page=Math.ceil(total/limit);

        query.skip(skip).limit(limit);

        let result = await query.exec();
        // console.log("r",result);
       let finaldata={
            page,
            limit,
            total,
            result,
            total_page,

        }
        
        return response(
            (error=false),
            (message="Success"),
            finaldata,
            statusCode.accepted

        )
    } catch (error) {
        return response(
            (error = true),
            (message = "Product Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
    }


}

// show single product by Id
async function singleProduct(params) {
    try {
        let result = await ProductModel.findById(params.id, { isDeleted: false });

        if (!result) {
            return response(
                (error = false),
                (message = "Product not found"),
                {},
                statusCode.notAcceptable
            );
        } else {
            // Convert createdAt to a Date object
            const creationDate = new Date(result.createdAt);
            const currentDate = new Date();
            const daysSinceCreation = Math.floor((currentDate - creationDate) / (1000 * 60 * 60 * 24));

            // Add daysSinceCreation to the result object
            result.daysSinceCreation = daysSinceCreation;

            return response(
                (error = false),
                (message = "Success"),
                // result,
                { ...result.toObject(), daysSinceCreation },
                statusCode.accepted
            );
        }
    } catch (error) {
        return response(
            (error = true),
            (message = "Product Service Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
        );
    }
}


// Update product by Id
async function update(data,params) {
  
    try {
        const result = await ProductModel.findByIdAndUpdate(params.id, data, { isDeleted: false })
        
        const newStock = new StockModel({
            product_id: result._id,
          });
          await newStock.save();
          return response(
            (error=false),
            (message="Success"),
            result,
            statusCode.created

        )

        

    } catch (error) {
        return response(
            (error = true),
            (message = "Product Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
    }
}

// Delete Product by Id

async function remove(data) {
    
    try {
        const idValue = data.id;
        const result = await ProductModel.findByIdAndUpdate(idValue, { isDeleted: true })
        console.log(result);
        const result2 = await StockModel.findOneAndUpdate(
            { product_id: result._id },
            { isDeleted: true }
        );
        return response(
            (error=false),
            (message="Success"),
            (data = null),
            statusCode.success


        )

    } catch (error) {
        return response(
            (error = true),
            (message = "Product Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
    }
}



//  search product by product name


module.exports= {
    allProduct,
    singleProduct,
    create,
    update,
    remove,
   

}