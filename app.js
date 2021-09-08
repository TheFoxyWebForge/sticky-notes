const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname+"/date.js");
const app = express();


app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
let items=[];
let worklists =[];
app.set('view engine', 'ejs');

app.get("/", function(req,res) {
let day = date.getdate();
 res.render("list", {listTitle: day, thenewitem :items});
});

app.get("/work",function (req, res){

res.render("list",{listTitle: "Work List", thenewitem :worklists});
});

app.post("/",function (req, res){
  let item = req.body.newitem;
if (req.body.plusbutton) {  if(req.body.plusbutton ==="Work List"){
    worklists.push(item);
res.redirect("/work");
}
else{
  items.push(item);
res.redirect("/");
}

}
else {

  if(req.body.minusbutton ==="Work List"){
    worklists.pop(item);
  res.redirect("/work");
  }
  else{
  items.pop(item);
  res.redirect("/");
  }
}

});

app.post("/work",function(req, res) {
  res.redirect("/work");

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running in port 3000");
});
