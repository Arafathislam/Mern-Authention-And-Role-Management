var mongoose = require('mongoose');
const SaleSchema= new mongoose.Schema({
    product_id:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    quantitySold:{
        type:Number,
       required:true,
       message: ' quantity  is missing'

    },
    salePrice: {
        type: Number,
        required: true,
        message: ' sale price  is missing',
      },
      costPrice: {
        type: Number,
        required: true,
        message: ' cost price  is missing'
      },

      productName: {
        type: String,
        default: '',
        required: true,
        trim: true,
        message: 'product name is missing'
    },


    
    status:{
        type:Boolean,
        required:false,
        default:true,
        message: 'status is missing'

    },
    isActive:{
        type:Boolean,
        default:false,
        required:false,
        message: 'active status is missing',

    },
    isDeleted:{
        type:Boolean,
        default:false,
        message: 'active status is missing',
        required:false,

    },

},
{
    timestamps: true,
}


)

//Model 

const SaleModel =mongoose.model('Sale',SaleSchema)

module.exports = SaleModel;