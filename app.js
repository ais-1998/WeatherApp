const express= require ("express");
const https= require("https");
const bodyParser=require("body-parser");
const app =express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html")
       });

       app.post("/", function(req,res){
         //  console.log(req.body.cityName);
          // console.log("Post request received");

          const query=req.body.cityName;
          const apikey="b0c1df518751ef7b0d5d1cb7ccc0fa47";
         const unit="metric";
          const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
          https.get(url,function(response){
             console.log(response);
      
            response.on("data", function(data){
                const weatherData=JSON.parse(data);
                 
                const aname=weatherData.name;
               const temp=weatherData.main.temp;
                const description=weatherData.weather[0].description;
                 const icon=weatherData.weather[0].icon
                 const imageURL=" http://openweathermap.org/img/wn/"+icon+"@2x.png"
                console.log(aname);
                console.log(temp);
                res.write("<h1>Country" + aname+" has temperature" + temp+ "</h1>");
                res.write("<p>The weather condition in" + aname+ " is"+  description+" </p>");
                res.write("<img src="+imageURL+">");
                res.send();
      })
      
   })
       })
     



app.listen(3000, function(){
    console.log("server has started");
})