import React, { useEffect, useState } from "react";
import Footer from "./Footer";

function Product() {
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [productID, setProductID] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const handleClick = (id) => {
    setShow(!show);
    setProductID(id);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      productID: productID,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    alert("Order Placed Successfully");
    setShow(!show);
  };

  return (
    <div className="product_container">
      {show ? (
        <div
          style={{
            border: "1px solid white",
            padding: "10px",
            background: "lightblue",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>User Form</div>
            <button onClick={() => setShow(!show)}>Close</button>
          </div>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="text"
              placeholder="Phone"
              name="contact"
              onChange={handleChange}
              value={formData.contact}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>
          {product.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.img} alt="" className="product_img" />
              <div className="product_details">
                <p className="product_name">{product.name}</p>
                <p className="product_price">${product.price}</p>
              </div>
              <p className="product_description">{product.description}</p>
              <button
                className="product_button"
                onClick={() => handleClick(product.id)}
              >
                Buy
              </button>
            </div>
          ))}
          <Footer />
        </>
      )}
    </div>
  );
}

export default Product;
