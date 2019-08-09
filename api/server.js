const express = require('express');
const cors = require('cors'); 
// helps us to connect to mongodb database
const mongoose =require('mongoose');

// our environment variables in the .env
require ('dotenv').config(); 

// will create our express server
const app = express();
const port = process.env.PORT || 5000;

// cors middleware that will allow us to parse json, since server will be sending and receiving json.
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }).
catch(error => handleError(error));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter); 

// starts the server that will be listening on a certain port.
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});