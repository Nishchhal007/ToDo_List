const express = require('express');

const bodyParser = require('body-parser');

var items = [];
var workItems = [];

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    var today = new Date();
    const options = {
        weekday: 'long', 
        month: 'long', 
        day: 'numeric'
    }
   var day =today.toLocaleDateString("en-Us",options);
   res.render("list",{listTitle:day,new_task:items});

})

app.get("/work",function (req,res) {
    res.render("list",{listTitle:"Work Items",new_task:workItems})
})

app.post("/",function (req,res) {
   items.push(req.body.newTask);  
   res.redirect("/");
})
app.post("/work",function (req,res) {
   workItems.push(req.body.newTask);  
   res.redirect("/work");
})


app.listen(3000,function () {
    console.log("Server is running on port 3000");
})