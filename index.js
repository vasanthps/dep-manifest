#! /usr/bin/env node

var main  = require('./lib/main.js');
var jade = require('jade');
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv);

if((argv.hasOwnProperty('npm') && argv.hasOwnProperty('bower'))) {
	main.doNPMManifest(process.cwd());
	main.doBowerManifest(process.cwd());
} else if(argv.hasOwnProperty('npm')) {
	main.doNPMManifest(process.cwd());
} else if(argv.hasOwnProperty('bower')) {
	main.doBowerManifest(process.cwd());
} else {
	main.doNPMManifest(process.cwd());
	main.doBowerManifest(process.cwd());
}



var allData = main.getManifest();

if(!allData.length) {
	console.log('Cannot find package.json/bower.json. Please make sure you are in the correct project folder');
	process.exit(-1);
}

var manifestData = {
	app: allData.slice(0, 1)[0],
	deps: allData.slice(1, allData.length)
}

var report = jade.renderFile(path.join(__dirname, './report/index.jade'), manifestData);

var outputPath = argv.output? argv.output: 'mainfest.html';

try {
	fs.writeFileSync(path.join(process.cwd(), outputPath), report);
	console.log('Report generated');
	process.exit(0);
} catch(exp) {
	console.log('Failed to output report file. Please check output file path.');
	process.exit(-1);
}

