const express = require("express");
const app = express();
app.use(express.json());

let payments = [];
let idCounter = 1;

app.get("/payments", (req, res) => {
  res.json(payments);
});

app.post("/payments/process", (req, res) => {
  const { orderId, amount, method } = req.body || {};
  if (!Number.isInteger(orderId) || orderId <= 0)
    return res
      .status(400)
      .json({ error: "orderId must be a positive integer" });
  if (typeof amount !== "number" || amount <= 0)
    return res.status(400).json({ error: "amount must be a positive number" });
  if (!method || typeof method !== "string")
    return res.status(400).json({ error: "method is required (string)" });

  const payment = {
    id: idCounter++,
    orderId,
    amount,
    method,
    status: "SUCCESS",
  };
  payments.push(payment);
  res.status(201).json(payment);
});

app.get("/payments/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = payments.find((p) => p.id === id);
  if (!found) return res.status(404).json({ error: "Payment not found" });
  res.json(found);
});

app.listen(8083, () => console.log("Payment service running on 8083"));
