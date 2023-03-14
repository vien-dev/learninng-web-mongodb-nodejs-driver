const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('shopDB');
    const products = database.collection('products');
    // Query for a movie that has the title 'Back to the Future'
    const query = { _id: 2 };
    const product = await products.findOne(query);
    console.log(product);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
