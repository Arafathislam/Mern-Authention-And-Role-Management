var mongoose = require('mongoose');


// Defining Schema

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        default: '',
        required: true,
        trim: true,
        message: 'product name is missing'
    },
    description: {
        type: String,
        default: '',
        required: true,
        trim: true,
        message: 'product description is missing'
    },
    price: {
        type: Number,
        default: '',
        required: true,
        message: 'product price is missing'

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
        message: 'active status is missing',
        required: false

    },
    isDeleted: {
        type: Boolean,
        default: false,
        message: 'active status is missing',
        required: false

    },
    img:{
        type:String,
        default:false,
        required:false
    }


},
    {
        timestamps: true,
    }


)

//Model 

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel;