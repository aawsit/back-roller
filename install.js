var Service = require('node-windows').Service;

var svc = new Service({
	name: 'Back-Roller',
	description: 'Rolls Backup files to an archival location defined in config.json',
	script: 'app.js'
});

svc.on('install', () => {
	console.log('Install Complete');
	svc.start();
});

svc.install();