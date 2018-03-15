module.exports = function(){
    	var express = require('express');
    	var router = express.Router();
	var expressValidator = require('express-validator');


function getUserDetails(res, mysql, context, key, complete) {
	var sql = "SELECT first_name, last_name, email, skills FROM users WHERE users.id = ?";
	console.log(key);
	var key = [key];  
	mysql.pool.query(sql, key, function(error, results, fields) {
		if (error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		context.user = results[0];
		console.log(context);
		console.log("completed user details query");
		complete();
		});
}

function getBiodiversityFavorite(res, mysql, context, key, complete){
	var sql = "SELECT type FROM biodiversity INNER JOIN users ON biodiversity.id = users.bio_fav WHERE users.id = ?";
	console.log(key);
	var key = [key];  
	mysql.pool.query(sql, key, function(error, results, fields) {
		if (error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		context.biotype = results[0];
		console.log(context);
		console.log("completed user details query");
		complete();
		});
}
function getUserBlooms(res, mysql, context, key, complete) {
	var sql = "SELECT name, details, DATE_FORMAT(date, '%m/%d/%Y') AS date, biodiversity.type AS biotype FROM blooms INNER JOIN biodiversity ON blooms.biotype = biodiversity.id INNER JOIN users ON blooms.userid = users.id WHERE users.id = ?";
	console.log(key);
	var key = [key];  
	mysql.pool.query(sql, key, function(error, results, fields) {
		if (error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		context.blooms = results;
		console.log(context);
		console.log("completed user blooms query");
		complete();
		});
}

router.get('/:id', function(req, res){
	var context = {};
	var callbackCount = 0;
	var mysql = req.app.get('mysql');
	var userid = req.params.id;
	getUserDetails(res, mysql, context, userid, complete);
	getUserBlooms(res, mysql, context, userid, complete);
	getBiodiversityFavorite(res, mysql, context, userid, complete);
	function complete() {
	callbackCount++;
	if (callbackCount >= 3) {
	      console.log("Sending to user page");
	      res.render('user', context);
	}
      };
});

return router;
} ();
