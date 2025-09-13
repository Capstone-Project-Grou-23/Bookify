const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Test server is working");
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:5000");
});
