const {mongoose}=require("mongoose");
const {v4:uuidv4}=require("uuid");
const staffSchema=new mongoose.Schema({
  staffId:{
    type:String,
    default:uuidv4,
    unique:true
  },
  userId:{
    
  },
  department:{
    type:String,
    enum: ["Food", "Housekeeping", "Reception"]
  },
  shift:{
    type:Number,
    require:true,
    enum:["1 shift","2 shift","3 shift"]
  },
  salary:{
    type:Number
  },
  status:{
    type:Number,
    require:true,
  }
});