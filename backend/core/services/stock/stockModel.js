var mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    stockQuantity: {
        type: Number,
        default: 0,
        required: false,
        message: 'Stock quantity  is missing'

    },
    status: {
        type: Boolean,
        required: false,
        default: true,
        message: 'status is missing'

    },
    isActive: {
        type: Boolean,
        default: true,
        required: false,
        message: 'active status is missing',

    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false,
        message: 'active status is missing',

    },

},
    {
        timestamps: true,
    }

)

//Model 

const StockModel = mongoose.model('Stock', StockSchema)


module.exports = StockModel;
