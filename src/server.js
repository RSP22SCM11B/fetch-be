const { app, port } = require("./utility/serverSetup");
const { getPoints, processReceipt } = require("./routes/receiptProcessor");

// Connection
app.listen(port, () => {
  console.log("-------------------------------");
  console.log(`Server started on port: ${port}`);
  console.log("-------------------------------");
  console.log(`URL: http://localhost:${port}/receipts/routeName`);
  console.log("-------------------------------");
});

// Process Receipt Route
app.post("/receipts/process", processReceipt);

// Get Points Route
app.get("/receipts/:id/points", getPoints);
