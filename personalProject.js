module.exports = function() {
	var express = require('express');
	var router = express.Router();
	var expressValidator = require('express-validator');


function getUserData(res, mysql, context, email, complete) {
	mysql.pool.query("SELECT userid FROM users WHERE users.email = ?", email ,function(error, results, fields) {;
	if (error) {
		res.write(JSON.stringify(error));
		res.end();
	}
	context.user = results[0];
	console.log(context);
	console.log("completed query");
	complete();
	});
}

router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	var mysql = req.app.get('mysql');
	function complete() {
		callbackCount++;
		if (callbackCount >= 1){
			res.render('personalproject', context);
		}
	}
});

	router.post('/', function(req, res) {
		const email = req.body.useremail;
		var mysql = req.app.get('mysql');
		
		var context = {};
		console.log("email:" + email);
		getUserData(res, mysql, context, email, complete);
		var userId = context.user;
		console.log("user:" + userId);
		// set blank fields to null for proper database insertion	
		const inputPname = req.body.inputPname;
		const inputPinfo = req.body.phone;
		const inputPlocation = req.body.inputPlocation;
		const recBlooms = req.body.recBlooms;

		var date = "";
		var biotype = "0";
		var privacy = {};
		if($("#displayname").is(":checked")){privacy.displayName = 'y';}
		else{ privacy.displayName = 'n';}
		if($("#displayemail").is(":checked")){privacy.displayEmail = 'y';}
		else{ privacy.displayEmail = 'n';}
		if($("#displayphone").is(":checked")){privacy.displayPhone = 'y';}
		else{ privacy.displayPhone = 'n';}
		if($("#comments").is(":checked")){privacy.comments = 'y';}
		else{ privacy.comments = 'n';}
		if($("#aafollowers").is(":checked")){privacy.aaFollowers = 'y';}
		else{ privacy.aaFollowers = 'n';}
		if($("#dfollowers").is(":checked")){privacy.dFollowers = 'y';}
		else{ privacy.dFollowers = 'n';}

		console.log(privacy);
		



		req.checkBody('inputPname', 'Project Name field cannot be empty.').notEmpty();
		req.checkBody('inputPinfo', 'Project Info field cannot be empty.').notEmpty();
		req.checkBody('inputPlocation', 'Project location field cannot be empty.').notEmpty();
		const errors = req.validationErrors();

		if (errors) {
			console.log(`errors: ${JSON.stringify(errors)}`);
			var context = {};
			var callbackCount = 0;

			function complete() {
				callbackCount++;
				if (callbackCount >= 1) {
					context.title = 'Creation Error';
					context.errors = errors;
					res.render('personalproject', context);



				}
			}
		} else {
			mysql.pool.query("INSERT INTO blooms (`date`, `biotype`, `name`, `details`, `dis_name`, `dis_email`, `dis_phone`, " +
				"`allow_comments`, `auto_accept`,`deny`,`userid`) " +
				"VALUES (?,?,?,?,?,?,?,?,?,?,?)", [date, biotype, req.body.inputPname, req.body.inputPinfo, privacy.displayName , privacy.displayEmail,
					privacy.displayPhone, privacy.comments, privacy.aaFollowers, privacy.dFollowers, userId
				],
				function(error, results, fields) {
					if (error) {
						var msg = JSON.stringify(error);
						var read_msg = JSON.parse(msg);
						var err_msg = read_msg.sqlMessage;
						res.set('content-Type', 'text/html');
						res.write("<h1>Something has gone wrong.</br></h1><p>You received the following error message:</p></br>");
						res.write(err_msg);
						res.end();
					} else {
						res.render('profile', {
							loginMessage: 'Congrats! You have successfully created a new bloom.'
						});
					}
				});
		}
	});

	return router;
}();