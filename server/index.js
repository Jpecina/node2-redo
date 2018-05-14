require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const products_controller = require("./products_controller/products_controller");

const app = express();
const port = 3001;

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

app.post("/api/product", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.delete("/api/product/:id", products_controller.delete);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
