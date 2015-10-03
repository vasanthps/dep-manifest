#! /usr/bin/env node

var main  = require('./lib/main.js');
var jade = require('jade');
var fs = require('fs');
var path = require('path');

main.doNPMManifest(process.cwd());
main.doBowerManifest(process.cwd());

var allData = main.getManifest();

var manifestData = {
	app: allData.slice(0, 1)[0],
	deps: allData.slice(1, allData.length)
}

var report = jade.renderFile(path.join(__dirname, './report/index.jade'), manifestData);

fs.writeFileSync(path.join(process.cwd(), 'manifest.html'), report);