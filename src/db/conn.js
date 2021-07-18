const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/youtubeRegistration",{
    useUnifiedTopology:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useCreateIndex:true    
}).then(()=>{
    console.log("connection successfull")
}).catch((e)=>{
    console.log("no connection"+e);
})