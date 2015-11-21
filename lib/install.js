var colors = require('colors'),
	exec = require('child_process').exec;

function installEmberCLI() {
	// install ember-cli
	exec('npm install ember', function(err, stdout, stderr) {
		console.log(stderr || stdout);
	});
}

function installHapi() {
	exec('npm install hapi', function(err, stdout, stderr) {
		console.log(stderr || stdout);
	});
}

module.exports = function() {
	installEmberCLI();
	installHapi();
};