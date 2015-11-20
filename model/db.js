// Bring Mongoose into the project
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = 'mongodb://localhost/kbdb';

// Create the database connection
mongoose.connect(dbURI);
var db = mongoose.connection;

// Define connection events
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/* ********************************************
      WELL SCHEMA
   ******************************************** */
var wellSchema = new mongoose.Schema({
well: {
	wellUWI: String,
	wellName: String,
    operatorName: String,
	leaseName: String,
	wellNumber: String,
	fieldName: String,
	fieldCode: String,
	wellClass: String,
	initialWellClass: String,
	wellStatus: String,
	GL: Number,
	KB: Number,
	elevationUOM: String,
	permitNumber: String,
	permitDate: String,
	provinceCode: String, 
    changeHistory: {
      createDate: Date,
      createSource: String,
      lastModifiedDate: Date,
      lastModifiedSource: String
    },
    surfaceLocation:{
			country: String,
			stateProvince: String,
			county: String,
			latitude: Number,
			longitude: Number,
			latLongSource: String,
			datum: String,
			projection: String,
		footageLocation: {
				northSouthFootage: Number,
				northSouthDirection: String,
				eastWestFootage: Number,
				eastWestDirection: String,
				footageReference: String,
				xCoordinate: Number,
				yCoordinate: Number,
				footageUOM: String,
				zoneCode: String,
				projection: String,
			},
		texasLocation: {
				railroadDistrict: String,
				blockLeagueNumber: Number,
				blockLeagueIndicator: String,
				blockFraction: String,
				sectionLaborNumber: Number,
				sectionLaborIndicator: String,
				sectionFraction: String,
				lotNumber: Number,
				townshipNumber: Number,
				townshipDirection: String,
				surveyName: String,
				abstractNumber: Number
			},
    },
	boreholes: [{
		uwi: String,
		TD: Number,
		TVD: Number,
		PBTD: Number,
		depthDatumElevation: Number,
		depthDatumUOM: String,
		formationCodeAtTD: String,
		formationAtTD: String,
		bottomLatitude: Number,
		bottomLongitude: Number,
		bottomLatLongSource: String,
		spudDate: Date,
		directionIndicator: String,
		completions: [{
			uwi: String,
			perforationTop: Number,
			perforationBottom: Number,
			completionDate: Date,
			producingFormationCode: String,
			producingFormation: String
		}],
	}]
}
});

// Build the User model
var myWells = mongoose.model( 'wellModel', wellSchema, 'cWells' );

// myWells.find({'well.wellName':'MILES 1'}, function(err,data){console.log(err, data, data.length);});

module.exports = myWells;


/* ********************************************
      USER SCHEMA
   ******************************************** */
var userSchema = new mongoose.Schema(
  {
	  firstName: String,
	  lastName: String
  }
);

// Build the User model
// mongoose.model( 'userModel', userSchema, 'Users' );
mongoose.model('User', userSchema, 'Users');

// x.find({'firstName':'Darcy'}, function(err,data){console.log(err, data, data.length);});

// function find(collec, query, callback){
//   mongoose.connection.db.collection(collec, function(err, collection){
//     collection.find(query.toArray(callback));
//   })
// };
// 
// find('Users', {lastName:'Vaughan'}, function(err, docs){
//   console.log(docs);
// });



