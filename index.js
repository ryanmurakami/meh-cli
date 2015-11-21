#! /usr/bin/env node

// validate OS
if (process.platform !== 'darwin') {
	console.log('Hey there! You\'re too fast for us. The meh stack only supports Mac OSX currently. Follow us at @mehjs for updates when we\'ll support other operating systems.');
	process.exit();
}

// did they pass a target?
if (process.argv.length < 3) {
	require('./lib/printHelp')();
} else {
	switch (process.argv[2]) {
		case 'install':
		case 'goahead':
			require('./lib/install')();
			break;
		case 'sample':
		case 'whatever':
			require('./lib/sampleApp')();
			break;
		case 'new':
		case 'howabout':
			require('./lib/create')(process.argv[3]);
			break;
		default:
			require('./lib/printHelp')();
	}
}