var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db;
console.log('Hello');

if(process.env.ENV == 'Test'){

    db = mongoose.connect('mongodb://localhost/booktest');
    console.log('Test Env')
}

else{
    console.log('Prod Env')
    db= mongoose.connect('mongodb://localhost/bookapi');
}

var connection = mongoose.connection;


connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("books", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data.length); // it will print your collection data
        })
    });

});

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use('/api/books', bookRouter); 


app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Running my app on  PORT: ' + port);
});

module.exports = app;