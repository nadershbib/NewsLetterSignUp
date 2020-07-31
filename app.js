require('dotenv').config()
const express = require("express");
const app = express()
app.use(express.static("public"));
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const request = require("request");
const { json } = require("body-parser");

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

console.log(process.env.MAILCHIMP_API_KEY )
app.post("/",(req,res)=>{

    const firstName= req.body.fname;
    const lastName=req.body.lname;
    const email = req.body.email;
    console.log(firstName,lastName,email);

     var data = {
         members:[
             {
                 email_address:email,
                 status:"subscribed",
                 merge_fields:{
                     FNAME:firstName,
                     LNAME: lastName
                 }

              





             }
         ]
     }

     var JSONdata = JSON.stringify(data);

     const url="https://us17.api.mailchimp.com/3.0/lists/6e4ca868b6";
     const options = {
         method:'POST',
         auth:process.env.MAILCHIMP_API_KEY
     }
     const request = https.request(url,options,(response)=>{
             
         if(response.statusCode===200){
             res.sendFile(__dirname+"/success.html");
         }
         else{
             res.sendFile(__dirname+"/failure.html");
         }

          console.log(JSON.parse(JSONdata));
     });

     request.write(JSONdata);
     request.end();
});


app.post("/failure",(req,res)=>{
  res.sendFile(__dirname+"/index.html");



});








app.listen(process.env.PORT || 3000,()=>console.log("server has just started at port 3000"));



// var port_number = server.listen(process.env.PORT || 3000);
// app.listen(port_number);

// const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
// app.listen(PORT, LOCAL_ADDRESS, () => {
//   const address = app.address();
//   console.log('server listening at', address);
// });