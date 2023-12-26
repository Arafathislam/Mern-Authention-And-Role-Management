var mongoose = require('mongoose');



// Defining Schema

const ReceiptSchema = new mongoose.Schema({
    receiptNumber: {
        type: String,
        required: true,
        message: 'receiptNumber is missing'
    },

    subTotal: {
        type: Number,
        required:false,
        message: ' subtotal  is missing'
    },
    sellerDetail: {
        type: String,
        default: '',
        required: true,
        message: 'seller details is missing'
    },

    customerDetail: {
        type: String,
        default: '',
        required: true,
        message: 'customer details is missing'
    },

    grandAmount: {
        type: Number,
        required: false,
        message: ' grandtotal  is missing'
    },
    discount: {
        type: Number,
        default:0,
        required: false,
        message: ' discount is missing'
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

    soldProducts: [
        {
            sale_id: {
                type: mongoose.Types.ObjectId,
                ref: "Sale",
            },
        },
    ]

},
{
    timestamps: true,
  }

)

//Model 

const ReceiptModel = mongoose.model('Receipt', ReceiptSchema)

module.exports = ReceiptModel;