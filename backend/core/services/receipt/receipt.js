
var generateRecieptNumber =require('../../../lib/utils/receiptnumber.js') 
const { createObject, response } = require("./createObject.js");
const statusCode = require("../../status/statusCode.js");
const errorMessage = require("../../status/errorMessage.js");
const SaleModel =require('../sales/salesModel.js');
const ReceiptModel= require('../receipt/receiptModel.js')
//get all receipt

async function allReceipt(data) {

  try {
   
      const page = parseInt(data.page) || 1;
      const limit = parseInt(data.limit) || 10;

      const skip = (page - 1) * limit;

      const query = ReceiptModel.find({ isDeleted: false }).sort({_id: -1});
      const total = (await ReceiptModel.countDocuments({}))
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
        (message = "Receipt Service  Internal Server Error"),
        (data = null),
        (httpStatus = statusCode.internalServerError)
      );

}


}


//get single receipt

async function singleReceipt(params){

    try{
        let data =await ReceiptModel.findById(params.id)

        return response(
            (error=false),
            (message="Success"),
            data,
            statusCode.accepted
    
        )

       


    }catch (error) {
        console.log(err)
        return response(
            (error = true),
            (message = "Receipt Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );

}
}

// create receipt

async function create(data){

    try{
        const {discount,soldProducts,customerDetail,sellerDetail}=data;
        let l=soldProducts.length;
        if(l===0){
            return response(
                (error=false),
                (message="receipt not found"),
                {},
                statusCode.notAcceptable
            )
        }
        let saleInfo=[];
        console.log("sold",soldProducts);
        for(let i=0;i<l;i++){
          console.log(soldProducts[i].sale_id)
            let sale=await SaleModel.findById(soldProducts[i].sale_id);
           if(sale){

             saleInfo.push(sale);
           }
        }
        // console.log("saleinfo",saleInfo)
        const totalSale = saleInfo.reduce(
            (sum, sale) => sum + sale.salePrice * sale.quantitySold,
            0
          );

          const grandTotal = totalSale - discount;
          const RecieptNumber = generateRecieptNumber();
          const receipt = new ReceiptModel({
            receiptNumber: RecieptNumber,
            subTotal: totalSale,
            customerDetail:customerDetail,
            sellerDetail:sellerDetail,
            discount: discount,
            grandAmount: grandTotal,
            soldProducts: soldProducts,
          });
    
          receipt.save();


          return response(
            (error=false),
            (message="Success"),
            receipt,
            statusCode.accepted
    
        )

    }catch(error) {
        console.log(error)
        return response(
            (error = true),
            (message = "Receipt Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
    }
}

//finding receipt by date 

async function recieptByDate(data) {
 
    try {
      const { firstDate, lastDate } = data;
      if (firstDate || lastDate) {
        const data = await ReceiptModel.find({
          createdAt: { $gte: new Date(firstDate), $lt: new Date(lastDate) },
        });
        return response(
            (error=false),
            (message="Success"),
            DataTransferItem,
            statusCode.accepted
    
        )
      } else {
        return response(
            (error=false),
            (message="receipt not found"),
            {},
            statusCode.notAcceptable
        )
      }
    } catch (error) {
        console.log(err)
        return response(
            (error = true),
            (message = "Receipt Service  Internal Server Error"),
            (data = null),
            (httpStatus = statusCode.internalServerError)
          );
  }
}



module.exports= {
    allReceipt,
    singleReceipt,
    create,
    recieptByDate
}

