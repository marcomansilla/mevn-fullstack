const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

// Local Imports
const api = require("./routes/api/service");

// Set port
const PORT = process.env.port || 3000;


var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.get("/", (req, res)=>{
    res.send("askdljaskdjsjad");
});

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
});
