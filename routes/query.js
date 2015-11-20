//query.js

var express = require('express');
var router = express.Router();
var myWells = require('../model/db');

//GET request
router.get('/', function(req, res, next)
{
	console.log('inside query.js/router.get');
	res.render
	('query-page', {
		title: 'Wells',
		wellID: "",
		wellName: "",
		wellUWI: "",
		fieldName: "",
		operatorName: "",
		stateProvince: "",
		latitude: null,
		county: "",
		country: "",
		longitude: null,
		leaseName: "",
		wellNumber: null,
		boreholeUWI: ""
		}
	);
});

router.post('/', function(req, res, next)
{
	console.log('query.js/router.post -->request payload : ' + JSON.stringify(req.body));
	// req.locals.page = req.locals.page + 1;

	var query = myWells.find();
	var query2 = myWells.find();
//If the filters are in an array use the below code
	// var filters = [
	// 	{fieldName:'well.wellName', value: "MILES 1"},
	// 	{fieldName:'well.surfaceLocation.stateProvince', value: "Texas"}	
	// ];
	// 
	// for (var i=0; i < filters.length; i++){
	// 	query.where(filters[i].fieldName).equals(filters[i].value);
	// }
	
	//using the req.body to build the filter
	for (var fieldName in req.body)
	{
		if(req.body.hasOwnProperty(fieldName))  //only want noninherited properties
		{
			console.log('fieldName : ' + fieldName);
			if(req.body[fieldName])  //get rid of empty fields
			{
				console.log('fieldValue : ' + req.body[fieldName]);	
				query.where(fieldName).equals(req.body[fieldName]);	
				query2.where(fieldName).equals(req.body[fieldName]);	
			}
		}
	}

	query.select().limit(1).skip(0).sort({_id:1}).exec(function(err, data)
	{
		console.log('QUERY EXECUTE: ' + err, data);

		if (data.length === 0)
		{  								//No wells returned from the query
			res.render('query-page', {
				title: 'Wells'
			});  
		}
		else
		{  								// Query returned some wells
			res.render('well-page', {
				title: 'Wells',
				wellID: data[0]._id,
				wellName: data[0].well.wellName,
				wellUWI: data[0].well.wellUWI,
				fieldName: data[0].well.fieldName,
				operatorName: data[0].well.operatorName,
				stateProvince: data[0].well.surfaceLocation.stateProvince,
				latitude: data[0].well.surfaceLocation.latitude,
				county: data[0].well.surfaceLocation.county,
				country: data[0].well.surfaceLocation.country,
				longitude: data[0].well.surfaceLocation.longitude,
				leaseName: data[0].well.leaseName,
				wellNumber: data[0].well.wellNumber,
				boreholeUWI: data[0].well.boreholes[0].uwi,
				wellStatus: data[0].well.wellStatus
				}
			);
		}
	});
	
	query2.count().exec(function(err, data)
	{
		console.log('COUNT is ' + data);
	});
});

module.exports = router;