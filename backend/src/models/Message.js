const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(

{

service:{

type:String,

required:[true,"Please select a service"],

trim:true

},

budget: {

    type: String,

    enum: [

        "Under ₹10K",

        "₹10K – ₹50K",

        "₹50K – ₹1L",

        "₹1L+"

    ],

    required: true

},

timeline:{

type:String,

enum:[

"ASAP",

"1 Week",

"2 Weeks",

"1 Month",

"Flexible"

],

required:true

},

name:{

type:String,

required:[true,"Please provide your name"],

trim:true,

minlength:[3,"Name should contain at least 3 characters"],

maxlength:[50,"Name cannot exceed 50 characters"]

},

email:{

type:String,

required:true,

trim:true,

lowercase:true,

match:[

/^[^\s@]+@[^\s@]+\.[^\s@]+$/,

"Invalid Email"

]

},

phone:{

type:String,

required:true,

trim:true,

match:[

/^[6-9]\d{9}$/,

"Invalid mobile number"

]

},

company:{

type:String,

trim:true,

maxlength:[100,"Company name too long"]

},

requirements:{

type:String,

required:true,

trim:true,

minlength:[10,"Minimum 10 characters"],

maxlength:[3000,"Requirements too long"]

},

isRead:{

type:Boolean,

default:false

},

createdAt:{

type:Date,

default:Date.now

}

},

{

timestamps:true

}

);
messageSchema.index({

isRead:1

});

messageSchema.index({

createdAt:-1

});
module.exports=mongoose.model("Message",messageSchema);