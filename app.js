const mongoose = require("mongoose");

const product = mongoose.Schema({
  _id: Number,
  name: String,
  price: Number,
  stock: Number,
  reviews: [{
    authorName: String,
    rating: Number,
    review: String
  }]
});
const Products = mongoose.model("Products", product);

async function run() {
    mongoose.connect("mongodb://127.0.0.1:27017/shopDB").then(async function() {
      await Products.deleteMany({}).then(function() {
        console.log("All documents in shopDB.products are removed!");
      }).catch(function() {
        console.log("Cannot remove documents from shopDB.products");
      });
  
      const pen = new Products({
        _id: 1,
        name: "Pen",
        price: 1.2,
        stock: 32
      });
      pen.save();
  
      var products = await Products.find({});
      console.log(products);
  
      Products.insertMany([
        {
          _id: 2,
          _name: "Rubber",
          price: 1.3,
          stock: 43,
          reviews: [
            {
              authorName: "Sally",
              rating: 5,
              review: "Best rubber ever!"
            },
            {
              authorName: "John",
              rating: 5,
              review: "Awesome rubber!"
            }
          ]
        },
        {
          _id: 3,
          name: "Pencil",
          price: 0.8,
          stock: 12,
          reviews: [
            {
              authorName: "Phuong",
              rating: 4,
              review: "Ok"
            },
            {
              authorName: "Vien",
              rating: 4,
              review: "So so"
            }
          ]
        }
      ]).then(function() {
        console.log("Rubber and Pencil are inserted to shopDB.products");
      });
  
      products = await Products.find({});
      console.log(products);
      
      console.log("Query for products with stock greater than 15");
      products = await Products.find({stock: {$gt: 15}});
      console.log(products);
  
      Products.updateOne({_id: 3}, {
        $set: {
          price: 0.90,
          stock: 20
        }
      }).then(function() {
        console.log("Updated price and stock for Pencil");
      });
  
      products = await Products.find({stock: {$gt: 15}});
      console.log(products);
    }).catch(err => console.log(err));
}
run();
