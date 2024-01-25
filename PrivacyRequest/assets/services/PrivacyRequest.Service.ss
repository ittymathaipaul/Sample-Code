
function service(request, response)
{
	'use strict';
	try 
	{
		require('CD.PrivacyRequest.PrivacyRequest.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('CD.PrivacyRequest.PrivacyRequest.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}