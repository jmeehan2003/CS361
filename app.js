var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/', require('./home.js'));

app.use('/signup', require('./signup.js'));

// app.use('/login', require('./login.js'));

app.post('/addUser', function(req,res,next) {

    mysql.pool.query("INSERT INTO users (`first_name`, `last_name`, `street`, `street2`, `city`, `state`, `zip`, " +
        "`country`, `phone`,`email`,`skills`,`bio_fav`, `logins`, `username`, `password`) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.fname, req.body.lname, req.body.street,req.body.street1, req.body.city, req.body.state,
            req.body.zip, req.body.country, req.body.phone, req.body.useremail,req.body.skills, req.body.bio, 0,
            req.body.username, req.body.password],

        function (err,result){
            if(err){
                next(err);
            }
        });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<script>setTimeout(function() {window.location.href = "/";})');
    res.end();
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

