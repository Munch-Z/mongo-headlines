const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = 5000 || process.env.PORT;


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdb";

//Connect to DB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../views')));
app.use('/', apiRoutes);



app.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})