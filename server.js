const express = require('express')
const path = require('path')
const server = express()
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
server.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//to display static files
server.use(express.static(path.join(__dirname + '/public')));

require("./routes/api")(server);
require('./routes/html')(server);
// server.use(htmlRoutes)


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}... `)
});