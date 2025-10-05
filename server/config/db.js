 import mongoose from "mongoose";

const connectDB = async()=>{

    try{
        mongoose.connection.on('connected',()=>console.log('Database Connected'))
      await mongoose.connect(`${process.env.MONGODB_URL}/AI-Career-Coach`);
    }catch(error)
    {
       console.log(error.message)
    }
}

export default connectDB;