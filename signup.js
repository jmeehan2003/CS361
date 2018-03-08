module.exports = function(){
    	var express = require('express');
    	var router = express.Router();
	var expressValidator = require('express-validator');
	
function getBiodiversity(res, mysql, context, complete){
	mysql.pool.query("SELECT id, type FROM biodiversity", function(err, results, fields) {
		if (err) throw err;
		context.biotypes = results;
		complete();
	});
}

router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	var mysql = req.app.get('mysql');
	getBiodiversity(res, mysql, context, complete);
	function complete() {
		callbackCount++;
		if (callbackCount >= 1){
			res.render('signup', context);
		}
	}
});

router.post('/', function(req, res){
	var context = {};
	console.log(req.body.useremail);
	console.log(req.body.bio);
	const password = req.body.password;
	req.checkBody('fname', 'First name field cannot be empty.').notEmpty();
	req.checkBody('lname', 'Last name field cannot be empty.').notEmpty();
	req.checkBody('useremail', 'Email field cannot be empty.').notEmpty();
	req.checkBody('street', 'Address field cannot be empty.').notEmpty();
	req.checkBody('city', 'City field cannot be empty.').notEmpty();
	req.checkBody('country', 'Country field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();

	req.checkBody('useremail', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('useremail', 'Email address must be between 4 and 50 characters long. Please try again.').len(4, 50);
	req.checkBody('password', 'Password must have at least one lowercase character, one uppercase character, one number, and one special character.').matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?@$%^&*!-]).{8,}$/);
	req.checkBody('password', 'Passwords must be between 8 and 20 characters long.').len(8, 20);
	req.checkBody('verpassword', 'Passwords do not match. Please try again.').equals(password);
	const errors = req.validationErrors();
	
	if (errors) {
		console.log(`errors: ${JSON.stringify(errors)}`);
		res.render('signup', {
			title: 'Registration Error',
			errors: errors
		});
	}
	
});

return router;
} ();
