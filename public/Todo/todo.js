const express = require("express");
const bodyParser = require("body-parser");
const datejs = "/home/quirinnik/Documents/WebDev/modules/date.js"
const today = require(datejs);
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
const dt = today.getDate();
const day = today.getDay();
const longDate = `${dt[0]}, ${dt[1]} ${dt[2]}`;
const date = longDate;

const port = 3000


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://merkfam:Lithiumx1!@startup.h7w49.mongodb.net/todoDB", {useNewUrlParser: true});
app.set('view engine', 'ejs');

const itemSchema = new mongoose.Schema ({
  item: {
    type: String,
    required: (true, "An Item Must First Be Created.")
  }
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  item: "---------- New List ----------",
});
const item2 = new Item({
  item: "Type a new item and push the '+' button to add a new item.",
});
const item3 = new Item({
  item: "<------ Check the box to delete.",
});
const item4 = new Item({
  item: "When you type a new list directory it will be the name of the list.",
});
const defaultItems = [item1, item2, item3, item4];

const listSchema = {
  name: String,
  items: [itemSchema]
}
// console.log(listSchema)

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {
  Item.find({}, function(err, results){
    console.log(results)
    if (err){
      console.log(err)
    }
    else if (results.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err){
          console.log(err)
        } else {
          console.log("Successfully inserted all items.")
        }
      });
      res.redirect("/")
    }
    else {
      const listTitle = date
      // console.log(listTitle)
      res.render("list", {listTitle: [listTitle, day], newListItems: results});
    }
  });
});

app.post("/", function(req, res){
  const item = req.body.newItem
  const listName = req.body.list
  console.log(listName)
  console.log(day)
  if (item === "" || item === " "){
    res.redirect("/")
  } else {

      const itemName = new Item({item: item})
      if (listName === day){
        itemName.save()
        res.redirect("/")
      } else {
        List.findOne({name: listName}, function(err, foundList){
          console.log(foundList)
          foundList.items.push(itemName)
          foundList.save();
          res.redirect("/" + listName)
        })
      }

};
});

app.post("/delete", function(req, res){
  const itemId = req.body.checkBox
  const listName = req.body.listName
  // checkBox = checkBox.split(",");
  // const listName = checkBox[0]
  // const itemId = checkBox[1]
  console.log()
  console.log(`listItem & itemID: [${listName}, ${itemId}]`)
  console.log()
  if (listName === day){
    console.log("LIST NAME IS DAY")
    Item.findByIdAndRemove(itemId, function(err){
      if (err){
        console.log("Error Below: ")
        console.log(err)
      }
    res.redirect("/")
  })} else {
     console.log("LIST NAME IS NOT DAY.")
     List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}, function(err, foundList){
     if (err){
        console.log("Error Message Below:")
        console.log(err)
      } else {
        console.log("FOUNDLIST BELOW:")
        console.log(foundList)
        res.redirect("/"+listName)
          }
        })
    }
  })

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  const title = customListName + " List"

  List.findOne({name: customListName}, function(err, foundList){
    if (err){
      console.log("Error:")
      console.log(err)
    } else {

      if (!foundList){
        console.log(customListName)
        console.log(defaultItems)
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect("/"+customListName)

      } else {
        console.log("List Exists.")
        res.render("list", {listTitle: [foundList.name, foundList.name], newListItems: foundList.items})
      }
    }
  }
)
});










app.listen(port, function() {
  console.log("Server started on port 3000");
});
