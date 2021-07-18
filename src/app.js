require("dotenv").config();
const express=require("express");
const app=express();
const port=process.env.PORT || 4000;
const path=require("path");
const hbs=require("hbs");
const bcrypt=require("bcryptjs");
const Register=require("./models/registers");
require("./db/conn");
const jwt=require("jsonwebtoken");

const exact=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(exact));
hbs.registerPartials(partialsPath);

app.set("view engine","hbs");
app.set("views",templatePath);


app.get("/",(req,res)=>{
    res.render("index");
    })


    app.get("/register",(req,res)=>{
        res.render("register");
        })

        app.get("/login",(req,res)=>{
            res.render("login");
            })
        
            app.post("/login",async (req,res)=>{
 try{
const email=req.body.email;
const password=req.body.password;
const userEmail=await Register.findOne({email:email})
const isMatch=await bcrypt.compare(password,userEmail.password);
const token=await userEmail.generateAuthToken();

if(isMatch){
    res.status(201).render("index");
}
else{
    res.send(`invalid  login details`);
}

 }catch(e){
     res.status(400).send(e);
 }
 
 
            })

 app.post("/register", async (req,res)=>{
try{
const password=req.body.password;
const cpassword=req.body.confirmpassword;
if(password===cpassword)
{
    const registerEmployee=new Register({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        gender:req.body.gender,
        phone:req.body.phone,
        age:req.body.age,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword
    })
    
    console.log("the success part" + registerEmployee);

// const send=await registerEmployee.save();

//before saving this and concept of middleware to protect the password
//one more a middeware to generate a user token
const token=await registerEmployee.generateAuthToken();

const registered = await registerEmployee.save();
console.log("the page part" + registered);

res.status(201).render("index"); 
// alert("employee registered successfully");

}
else{

    res.send(`password didn't matched`);
}
}
catch(e){
res.status(400).send(e);
}           
})
// const bcrypt=require("bcryptjs");
//  const securePassword=async (password)=>{
//      const passwordHash=await bcrypt.hash(password,10);
//        const passwordmatch=await bcrypt.compare(password,passwordHash);
//        console.log(passwordHash);
//        console.log(passwordmatch);
//     }
// securePassword("thpa@350");        

// const jwt=require("jsonwebtoken");
// const createToken=async ()=>{
// const token=await jwt.sign({_id:"60ef07046970024fdcae261a"},"mydfghjkfghjfghjfghjvndishuyhbfvuabvuyabvuyadbvayvayvby",{
//     expiresIn:"2sec",
// }
// );

// console.log(token);
// const userVer=jwt.verify(token,"mydfghjkfghjfghjfghjvndishuyhbfvuabvuyabvuyadbvayvayvby");
// console.log(userVer);
// }



// createToken();







app.listen(port,()=>{
console.log(`server is runing at port number ${port}`);
})
