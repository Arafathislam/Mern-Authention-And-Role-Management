var mongoose = require('mongoose');

const DailySaleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
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

const DailySale = mongoose.model("DailySale", DailySaleSchema);


module.exports = DailySale;
