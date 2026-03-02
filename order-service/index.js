const express = require("express");
const app = express();
app.use(express.json());

let orders = [];
let idCounter = 1;

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", (req, res) => {
  const { item, quantity, customerId } = req.body || {};
  if (!item || typeof item !== "string")
    return res.status(400).json({ error: "item is required (string)" });
  if (!Number.isInteger(quantity) || quantity <= 0)
    return res
      .status(400)
      .json({ error: "quantity must be a positive integer" });
  if (!customerId || typeof customerId !== "string")
    return res.status(400).json({ error: "customerId is required (string)" });

  const order = {
    id: idCounter++,
    item,
    quantity,
    customerId,
    status: "PENDING",
  };
  orders.push(order);
  res.status(201).json(order);
});

app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = orders.find((o) => o.id === id);
  if (!found) return res.status(404).json({ error: "Order not found" });
  res.json(found);
});

app.listen(8082, () => console.log("Order service running on 8082"));
