const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "A product must have a name!"]
  },
  price: {
    type: Number,
    required: [true, "A product must have a price!"]
  },
  stock: {
    type: Number,
    required: [true, "A product must have a stock number!"]
  },
  reviews: [{
    authorName: String,
    rating: Number,
    review: String
  }]
});
const Products = mongoose.model("Products", productSchema);

const orderSchema = mongoose.Schema({
  _id: Number,
  item: productSchema,
  amount: Number
})
const Orders = mongoose.model("Orders", orderSchema);

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopDB");
    console.log("Connected to shopDB in MongoDB!");

    await Products.deleteMany({});
    console.log("All documents in shopDB.products are removed!");

    const pen = new Products({
      _id: 1,
      name: "Pen",
      price: 1.2,
      stock: 32
    });
    await pen.save();
    console.log("Created document for pen in shopDB.products");

    await Products.insertMany([
      {
        _id: 2,
        name: "Rubber",
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
    ])
    console.log("Rubber and Pencil are inserted to shopDB.products");

    var products = await Products.find({});
    console.log("Queried for all documents in shopDB.products");
    if(products) {
      console.log(products);
    }
    
    products = await Products.find({stock: {$gt: 15}});
    console.log("Queried for all documents with stock greater than 15 in shopDB.products");
    if(products) {
      console.log(products);
    }

    await Products.updateOne({_id: 3}, {
      $set: {
        price: 0.90,
        stock: 20
      }
    })
    console.log("Updated price and stock for Pencil");

    products = await Products.find({stock: {$gt: 15}});
    console.log("Queried for all documents with stock greater than 15 in shopDB.products");
    if(products) {
      console.log(products);
    }

    const rubber = await Products.findOne({name: {$eq: "Rubber"}});

    const buyRubber = Orders({
      _id: 1,
      item: rubber,
      amount: 2
    })
    await buyRubber.save();

    const orders = await Orders.find({});
    console.log(orders);
  } catch (err) {
    console.log(err);
  }
}
run();
