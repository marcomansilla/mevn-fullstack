const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

// Local Imports
const api = require("./routes/api/service");

// Set port
const PORT = process.env.port || 3000;

var app = express();

if (process.env.NODE_ENV==='production'){
    // Set static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get('/', (req, res)=>res.sendFile(__dirname+'/public/index.html'));
}

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.get("/", (req, res)=>{
    res.send("");
});

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
});
