const { MongoClient } = require("mongodb");
const assert = require("assert");
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('shopDB');
    const products = database.collection('products');
    await products.deleteMany({});
    const docs = [
        { _id: 1, name: 'Pen', price: 1.2, stock: 32 },
        {
            _id: 2,
            name: 'Rubber',
            price: 1.3,
            stock: 43,
            reviews: [
            { authorName: 'Sally', rating: 5, review: 'Best rubber ever!' },
            { authorName: 'John', rating: 5, review: 'Awesome rubber!' }
            ]
        },
        {
            _id: 3,
            name: 'Pencil',
            price: 0.8,
            stock: 12,
            reviews: [
            { authorName: 'Phuong', rating: 4, review: 'Ok' },
            { authorName: 'Vien', rating: 4, review: 'So so' }
            ]
        }
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await products.insertMany(docs, options);

    assert.equal(result.insertedCount, 3);

    const query = {};
    await products.find(query).forEach((val) => { 
      console.dir(val);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run();