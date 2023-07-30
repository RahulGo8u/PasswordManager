require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();



app.use(cors({origin: '*'}));

app.use(express.json());

const usersRoutes = require('./routes/users');
const usersLoginRoutes = require('./routes/userlogins');
const usersPasswordRoutes = require('./routes/userpasswords');

app.use('/api/user', usersRoutes);
app.use('/api/user', usersLoginRoutes);
app.use('/api/userpassword', usersPasswordRoutes);

// Set the CORS headers to allow requests from all domains
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers

//     next();
// });

const port =3002;
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})