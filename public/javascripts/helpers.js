function getWellName(leaseName, wellNumber, callback)
{
	var wellName = leaseName + ' ' + wellNumber;
	
	//Make sure the callback is a function
	if(typeof callback === 'function')
	{
		callback(wellName);
	}
};

module.exports = getWellName;