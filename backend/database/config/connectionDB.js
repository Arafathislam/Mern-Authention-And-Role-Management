const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.set("strictQuery", false);

// const connect = async () => {
//   try {
//     mongoose.connect(DATABASE_URL, {
//       useNewUrlParser: true,
//     });
//     console.log(`Connected to Database`);
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports = connect;

const connect=async ()=>{
  try{
      const DB_OPTIONS={
          dbName:'role',
      }
      await mongoose.connect(DATABASE_URL,DB_OPTIONS);
      console.log("Connected Successfully...")
  }catch(error){
      console.log(error);
  }
}

 module.exports = connect;