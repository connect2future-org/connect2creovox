import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({

  title:String,

  category:String,

  image:String,

  description:String

},
{
  timestamps:true
});

export default mongoose.model(
  "Portfolio",
  portfolioSchema
);