require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routers = require('./routes/ProductRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
