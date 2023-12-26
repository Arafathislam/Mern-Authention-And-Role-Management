
var productRouter = require('./routes/product/index.js');
var saleRouter = require('./routes/sales/index.js');
var stockRouter = require('./routes/stock/index.js');
var receiptRouter = require('./routes/receipt/index.js');
var userRouter = require('./routes/user/index.js');
var dashboardRouter = require('./routes/dashboard/index.js');
var AdminRouter = require('./routes/admin/index.js');
var SMSRouter = require('./routes/sms/index.js');


module.exports = function () {
  app.use('/api/product',productRouter);
  app.use('/api/stock',stockRouter);
  app.use('/api/sale',saleRouter);
  app.use('/api/receipt',receiptRouter);
  app.use('/api/user',userRouter);
  app.use('/api/dashboard',dashboardRouter);
  app.use('/api/admin',AdminRouter);
  app.use('/api/sms',SMSRouter);
};
