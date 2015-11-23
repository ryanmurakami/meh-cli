var fs = require('fs'),
	colors = require('colors');

var msg = {
	noAppName: 'Missing a name for your app. How about '.magenta + 'kombucha'.green + '?'.magenta,
	createAppFailed: 'Failed to create %s. Here\'s what happened: %s'.red,
	appExists: 'This app already exists. Try again with a new app name?'.red
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

function handleAppPresence(exists, appName) {
	return new Promise(function(resolve, reject) {
		if (exists) {
			fs.readdir(appName, function(err, files) {
				if (err) {
					reject(err);
				} else {
					if (files.length > 0) {
						reject(msg.appExists);
					} else {
						resolve();
					}
				}
			});
		} else {
			fs.mkdir(appName, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		}
	});
}

function createApp(appName) {
	if (!appName) {
		console.error(msg.noAppName);		
		process.exit();
	}
	return new Promise(function(resolve, reject) {
		checkIfAppExists(appName).then(
			function(exists) {
				handleAppPresence(exists, appName).then(resolve)
				.catch(function(err) {
					reject(err);
				});
			})
		.catch(function(err) {
			reject(err);
		});
	});
};

module.exports = function(appName) {
	createApp(appName).then(function() {

	}).catch(function(err) {
		var errMsg = msg.createAppFailed
			.replace('%s', appName)
			.replace('%s', err);
		console.error(errMsg);
	});
};