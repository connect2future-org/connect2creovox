import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
{
  service:{
    type:String,
    required:true
  },

  budget:{
    type:String
  },

  timeline:{
    type:String
  },

  company:{
    type:String
  },

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true
  },

  phone:{
    type:String
  },

  requirements:{
    type:String
  },

  status:{
    type:String,
    default:"New"
  }

},
{
  timestamps:true
}
);

export default mongoose.model("Lead",leadSchema);