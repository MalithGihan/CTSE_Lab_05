const express = require("express");
const app = express();
app.use(express.json());

let items = ["Book", "Laptop", "Phone"]; // in-memory list (no DB required) :contentReference[oaicite:8]{index=8}

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const name = req.body?.name;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required (string)" });
  }
  items.push(name);
  res.status(201).json({ message: "Item added", name });
});

app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0 || id >= items.length) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json({ id, name: items[id] });
});

app.listen(8081, () => console.log("Item service running on 8081"));
