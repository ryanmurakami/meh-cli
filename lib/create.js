var fs = require('fs');

var msg = {
	noAppName: 'Missing a name for your app. How about kombucha?'
};

function checkIfAppExists(appName) {
	return new Promise(function(resolve, reject) {
		fs.stat(appName, function(err, stats) {
			if (err) {
				if (err.code === 'ENOENT') {
					resolve(false);
				} else {
					reject(err);
				}
			} else {
				resolve(true);
			}
		});
	});
}

function handleAppPresence(exists) {
	return new Promise(function(resolve, reject) {
		if (exists) {

		} else {

		}
	});
}

module.exports = function(appName) {
	if (!appName) {
		console.error(msg.noAppName);		
		process.exit();
	}
	return new Promise(function(resolve, reject) {
		checkIfAppExists(appName).then(
			function(exists) {
				handleAppPresence.then(resolve)
				.catch(function(err) {
					reject(err);
				});
			})
		.catch(function(err) {
			reject(err);
		});
	});
};