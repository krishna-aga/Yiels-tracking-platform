const express = require("express");
const poolsRoute = require("./routes/pools");

const app = express();
app.use("/api/pools", poolsRoute);

app.listen(process.env.PORT || 3000);
