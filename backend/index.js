
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const paymentRoutes = require("./payment.js");
const cors = require('cors');
require('dotenv').config({path:'.env'}); 
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT  ;
 //Database connection with moongo db;
 mongoose.set('strictQuery',true);
 mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected successfully ")).
 catch((error)=>
 {})
 
 app.get("/", (req, res) => {
     res.send(" <h1> Expres App is Running </h1>");
 });
 const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
 });

 const upload = multer({ storage: storage });

 
  app.use('/picture',express.static('upload/images'));
  app.use('/images', express.static('bakend/upload/images'));
  const Product =  mongoose.model("Product",{
  id:{
        type:Number,
        required:true,
    },
    name:{

        type:String,
        reuired:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:String,
        required:true,
    },
   old_price:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
 available:{
        type:Boolean,
        default:true
    }
 });

 app.post('/upload', upload.single('product'),(req, res) => {
    console.log( `http://localhost:4000/picture/${req.file.filename}`)
    res.json({                                            
        success: 1,                                       
        image_url: `http://localhost:4000/picture/${req.file.filename}`
    });
});

app.post("/addproduct", async (req,res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
          id = last_product.id+1;
    }
    else{
        id =1;
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category, // Fixed typo here
        new_price: req.body.new_price, // Fixed typo here
        old_price: req.body.old_price, // Fixed typo here
    });
   
    await product.save();
    
    res.json({
        success: true,
        name: req.body.name,
    });
 });

 app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
     
     res.json({
        success:true,
        name:req.body.name
     })
 })
// 
 app.get("/allproducts",async(req, res)=>{
     let products =  await Product.find({});
     
     res.json(products);
    
 })

 const User = mongoose.model('user',{
    name:{
        type:String,
        },
        email:{
            type:String,
            unique:true,
        },
        password:{
            type:String,
        },
        cardData:{
            type:Object,
        },
        date:{
            type:Date,
            default:Date.now,
        }})

        const fetchUser =  async(req, res,next)=>{
            
            const token =  req.header('auth-token');
            
                
                  if(!token)
                  {res.status(401).send({errors:"PLease authenticate using  valid"});}
                  else{
                     try{
                        const data =  jwt.verify(token,'secret_ecom');
                        
                        req.user = data.user;
                        next();
                     }catch(error)
                     {
                        
                    res.status(401).send({errors:"plese authenticate using value token"});
                  }
                  }
              }

 app.post('/signup', async(req, res)=>{
    let check = await User.findOne({email:req.body.email});
    
    if(check){
        return res.status(400).json({success:false,errors:"existing"})
    }
    let cart = {};
    for(let i =0;i<300;i++)
    {
        cart[i]=0;
    }

   const user  = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cardData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    
    const token=jwt.sign(data,'secret_ecom');
    
    
     res.json({success:true,token});
   })
 
   app.post('/login', async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passCompare =  req.body.password === user.password ;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }

            const token =  jwt.sign(data,'secret_ecom');
            res.json({success : true,token});
         }
         else{
            res.json({success:false,errors:"Wrong Password"});
         }
    }
    else{
        res.json({success:false, errors:'Wrong Email Id'})
    }
   })

  app.get('/newcollections' , async(req, res)=>{
    let  products =  await Product.find({});
    
      let newcollection = products.slice(1).slice(-8);
       

  res.send(newcollection);
   })

   app.get('/popularinwomen', async (req, res) => {
    try { 
        let products = await Product.find({ category: "women" });
        
        let popular_in_women = products.slice(0, 4);
        res.json(popular_in_women);
    } catch (error) {
        
        res.status(500).json({ error: "Internal server error" });
    }
});
// 
     


app.post('/addtocart',fetchUser,async(req,res)=>{
     
 let userData =  await User.findOne({_id:req.user.id});
 userData.cardData[req.body.itemId] +=1;
 await User.findOneAndUpdate({_id:req.user.id},{cardData:userData.cardData});
 res.send("Added");
 })
 
 app.post('/removefromcart',fetchUser,async(req, res)=>{
    
     let userData =  await User.findOne({_id:req.user.id});
     if(userData[req.body.itemId]>0)
     userData.cardData[req.body.itemId] +=1;
     await User.findOneAndUpdate({_id:req.user.id},{cardData:userData})
     res.send("Removed");
 })
app.post('/getcart',fetchUser,async (req,res)=>{

 let userData = await User.findOne({_id:req.user.id});
res.json(userData.cardData);
})

 app.use("/api/payment/", paymentRoutes);

 app.listen(PORT, (error) => {
     if (!error) {
    
    } else {
        
    }

});



