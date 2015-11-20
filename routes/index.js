var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KellyBushing' });
});*/

/* GET home page. */
// router.route('/')
//   .get(function(req, res, next)
//   {
//     res.render('query.jade', {title: 'KellyBushing'});
//   });
  
router.get('/', function(req, res, next)
{
	console.log('inside index.js/router.get');
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

module.exports = router;
