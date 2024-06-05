const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const userRoutes = require('./routes/user');
const favoriteMoviesRouter = require('./routes/favoriteMovies');




const app = express();
const port = process.env.PORT || 9000;


//middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/favorites', favoriteMoviesRouter);
// routes

app.get("/", (req, res) => {

    res.send("Welcomte to my API");
});


//mongodb connection

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));


app.listen(port, () => console.log ('server listening on port', port));

