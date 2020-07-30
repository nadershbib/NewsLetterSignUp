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
         auth:"nader1:10f951327cc1437e271d2fdbdc1ffd76-us17"
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








app.listen(3000,()=>console.log("server has just started at port 3000"));