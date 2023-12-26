var mongoose = require('mongoose');
const ProductSaleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    productName: {
      type: String,
      required: true,
    },
    totalSalePrice: {
      type: Number,
      required: true,
    },
    totalCostPrice: {
      type: Number,
      required: true,
    },

    totalUnitsSold: {
      type: Number,
      required: true,
    },
    totalProfit: {
      type: Number,
      required: true,
    },
    totalLoss: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProductSale = mongoose.model("DailyProductSale", ProductSaleSchema)

module.exports = ProductSale;