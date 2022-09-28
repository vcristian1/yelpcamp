//dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//initialize express 
const app = express();

//Middleware for template engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Routes
app.get('/', (req, res) => {
    res.render('home')
});

//Defining server port
app.listen(3000, () => {
    console.log('Serving on port 3000')
})