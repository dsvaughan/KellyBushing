//wells.js

var express = require('express');
var router = express.Router();
var myWells = require('../model/db');

//GET request
router.get('/', function(req, res, next)
{
	console.log('inside router.get');
	myWells
		.find()
		.select()
		.limit(1)
		.skip(0)
		.sort({_id:1})
		.exec(function(err,data){console.log(err, data, data.length);});
	
	// myWells.find(({}).skip(1).limit(1).sort({_id:1}),function(err,data){console.log(err, data, data.length);} );
	myWells
		.find({})
		.select()
		.limit(1)
		.skip(0)
		.sort({_id:1})
		.exec(function(err, data)
		{
			if(err) 
				{console.log('wells.js/router.get myWells.exec : ' + err)};

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
	);
});

//POST request
router.post('/', function(req, res, next)
	{
		// res.send('Got the POST request: ' + JSON.stringify(req.body));
		console.log('well.js/router.post : Well Name : ' + req.body.wellName + ', GUID : ' + req.body.wellID);
		
		//1. Find the Record
		myWells.findOne({'_id': req.body.wellID},function(err, myWell)
		{
			if(!err)
			{
				//2.  Edit the record
				myWell.well.wellName = req.body.wellName;
				myWell.well.wellUWI = req.body.wellUWI;
				// console.log('**wells.js/router.post : ', myWell.well.changeHistory.lastModifiedDate);
				// console.log('**wells.js/router.post : ', JSON.stringify(myWell));
				console.log('**wells.js/router.post 1 : ', myWell.well.changeHistory.lastModifiedDate);
				myWell.well.changeHistory.lastModifiedDate = Date.now();
				console.log('**wells.js/router.post 2 : ', myWell.well.changeHistory.lastModifiedDate);
				
				//3. Save the record
				myWell.save(function(err, myWell)
				{
					//4. Find the updated well again
					myWells.findOne({'_id': req.body.wellID},function(err, myWell)
					{
						if(!err)
						{
							//5. Display the Well Page Again
							res.render('well-page', {
								title: 'Wells',
								wellID: myWell._id,
								wellName: myWell.well.wellName,
								wellUWI: myWell.well.wellUWI,
								fieldName: myWell.well.fieldName,
								operatorName: myWell.well.operatorName,
								stateProvince: myWell.well.surfaceLocation.stateProvince,
								latitude: myWell.well.surfaceLocation.latitude,
								county: myWell.well.surfaceLocation.county,
								country: myWell.well.surfaceLocation.country,
								longitude: myWell.well.surfaceLocation.longitude,
								wellStatus:myWell.well.wellStatus
								
							});
						}else{
							//Err finding the well again
							console.err('well.js/router.post Error Finding Updated Well : ', err);
						}
					});
				});
			}
			else
			{
				console.log('Error : ', err);
			}
		});
		next();
	}
);

router.all('/', function(req, res, next)
{
	console.log('wells.js/router.all - This should get done for all paths');
});


		
module.exports = router;