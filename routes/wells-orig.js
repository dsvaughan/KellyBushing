//wells.js

var express = require('express');
var router = express.Router();
var myWells = require('../model/db')

//GET request
router.get('/', function(req, res, next)
{
	console.log('inside router.get');
	myWells.find({'well.wellName':'MILES 1', 'well.fieldName':{$regex: '^SPRA'}}, function(err,data){console.log('rocketship ' + err, data, data.length);}).limit(1);
	res.render('well-page', {title: 'Wells'});	
});


		
module.exports = router;