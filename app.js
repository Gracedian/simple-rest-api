const express = require("express");
const app = express();

app.use(express.json());

// dummy database (in-memory)
let transactions = [
  { id: 1, title: "Makan", amount: 20000 },
  { id: 2, title: "Transport", amount: 15000 }
];

// GET all
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

// GET by id
app.get("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(transaction);
});

// POST
app.post("/transactions", (req, res) => {
  const { title, amount } = req.body;

  const newTransaction = {
    id: transactions.length + 1,
    title,
    amount
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// PUT
app.put("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, amount } = req.body;

  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return res.status(404).json({ message: "Not found" });
  }

  transaction.title = title;
  transaction.amount = amount;

  res.json(transaction);
});

// DELETE
app.delete("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  transactions = transactions.filter(t => t.id !== id);

  res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});