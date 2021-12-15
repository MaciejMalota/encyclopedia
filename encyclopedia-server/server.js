const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

require('dotenv').config()
// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

app.use(morgan('tiny'))

// Seting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

// Bring in the Database Config and connect with the database
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});

// app.get('/', (req, res) => {
//     return res.send("<h1>Hello World</h1>");
// });
// Bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users);

// Bring in the Games route
const games = require('./routes/api/games');
app.use('/api/games', games);


app.get('*', (req, res) => {
    res.sendFile(path.join('D:/GIT projekty/encyclopedia', 'public/index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})



// const http = require('http');
// const express = require ('express');
// const mongoose = require('mongoose');

// const app= express();



// const hostname = '192.168.1.19';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//middleware


// app.use(express.static('public'));

//view engine
//app.set('view engine', './views');

// db connect

// const dbURI = 'mongodb+srv://admin:admin@encyklopedia.jl48h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true})
// .then((result)=>app.listen(3000))
// .catch((err)=> console.log(err));


//routes
//app.get('/', (req, res) => res.render('home'));