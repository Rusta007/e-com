const express = require("express");
const cors = require("cors");
// cors: Cross-Origin Resource Sharing
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  address: String,
  productID: Number,
});

const orderModel = mongoose.model("orders", orderSchema);

const app = express();

console.log("from server");

app.use(express.json());

app.use(cors());

// let products = [
//   {
//     id: 1,
//     name: "Product 1",
//     img: "https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/images-1.fill.size_2000x1125.v1723100793.jpg",
//     description: "Description for Product 1",
//     price: 10.99,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     img: "https://media.cnn.com/api/v1/images/stellar/prod/surface-laptop-best-tested.png?c=16x9&q=h_833,w_1480,c_fill",
//     description: "Description for Product 2",
//     price: 19.99,
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     img: "https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/IzcVfAu2kdJjoeYS.png",
//     description: "Description for Product 3",
//     price: 29.99,
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     img: "https://media.cnn.com/api/v1/images/stellar/prod/surface-laptop-best-tested.png?c=16x9&q=h_833,w_1480,c_fill",
//     description: "Description for Product 4",
//     price: 39.99,
//   },
//   {
//     id: 5,
//     name: "Product 5",
//     img: "https://media.cnn.com/api/v1/images/stellar/prod/surface-laptop-best-tested.png?c=16x9&q=h_833,w_1480,c_fill",
//     description: "Description for Product 5",
//     price: 49.99,
//   },
// ];

let products = [
  {
      id:101,
      name:"Laptop",
      img: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg",
      price: 50000,
      desc:"This is a laptop"
  },
  {
      id:102,
      name:"Mobile",
      img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/7/c/t/105-single-sim-keypad-mobile-phone-with-wireless-fm-radio-ta-original-imah3nhecpzsx3g9.jpeg?q=20&crop=false",
      price: 10000,
      desc:"This is a mobile"
  },
  {
      id:103,
      name:"Tablet",
      img: "https://media.wired.com/photos/649b2dbfc859c4a1cdecc412/master/w_960,c_limit/Amazon-Fire-Max-11-Review--Stand-Gear.jpg",
      price: 20000,
      desc:"This is a tablet"
  },
  {
      id:104,
      name:"Camera",
      img: "https://media.wired.com/photos/649b2dbfc859c4a1cdecc412/master/w_960,c_limit/Amazon-Fire-Max-11-Review--Stand-Gear.jpg",
      price: 30000,
      desc:"This is a camera"
  },
  {
      id:105,
      name:"Watch",
      img: "https://finebuy.co.in/wp-content/uploads/2023/01/casio-mesh-gold.webp",
      price: 40000,
      desc:"This is a watch"
  }
]


app.get("/products", (req, res) => {
  res.send(products);
});

app.post("/orders", async (req, res) => {
  const { name, email, contact, address, productID } = req.body;

  const order = new orderModel({
    name,
    email,
    contact,
    address,
    productID,
  });

  await order.save();
  res.send(order);
  res.status(200).json({ message: "Order placed successfully" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
