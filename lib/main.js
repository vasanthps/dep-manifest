(function() {
	'use strict';
	var fs = require('fs');
	var path = require('path');
	var Dep = require('./dep.js');
	
	var utils = {};
	var manifest = [];
	
	/**
	 * @desc Returns all dependencies specified in the fileData
	 * @params { object } file contents
	 * @returns { array } Array of dependency package names
	 */
	utils.getDepsList = function(fileData) {
		
		var depNames = [];
		
		if(fileData.dependencies) {
			for(var keys in fileData.dependencies) {
				depNames.push(keys);
			}
		}
		
		return depNames;
		
	};
	
	/**
	 * @desc Checks the package.json or bower.json returns its contents
	 * @params { string } fpath folder path
	 * @params { bool } isNpm npm or bower dependency
	 * @returns { object } file contents
	 */
	utils.readConfigFile = function(fpath, isNpm) {
		var fileData = {};
		try {
			if(isNpm) {
				fileData = require(path.join(fpath, 'package.json'));
			} else {
				fileData = require(path.join(fpath, 'bower.json'));
			}
			
			return fileData;
		} catch(exp) {
			console.log('Invalid package.json/bower.json file at ', fpath);
			return {};
		}
	}
	
	/**
	 * @desc Extracts the needed info from the package
	 * @params { object } Config file contents
	 * @returns { object }
	 */
	utils.collectPackageData = function(fileData, fpath) {
		for(var m in manifest) {
			if(manifest[m].match(fileData.name)) {
				manifest[m].add(fileData, path.relative(process.cwd(), fpath));
				return;
			}
		}
		
		var dep = new Dep(fileData, path.relative(process.cwd(), fpath));
		manifest.push(dep);
	};
	
	/**
	 * @desc Iterates from the top level path provided and adds all node_modules to the manifest object
	 */
	utils.npmIterator = function(fpath) {
		if(!fs.existsSync(path.resolve(path.join(fpath, 'package.json'))))
			return;
		var fileData = utils.readConfigFile(fpath, true);
		utils.collectPackageData(fileData, fpath);
		var nodeModsPath = path.resolve(path.join(fpath, 'node_modules'));
		if(!fs.existsSync(nodeModsPath))
			return;
		var deps = utils.getDepsList(fileData);
		for(var d in deps) {
			var newfpath = path.resolve(path.join(nodeModsPath, deps[d]));
			utils.npmIterator(newfpath);
		}
		
	};
	
	/**
	 * @desc Iterates from the top level path provided and adds all bower_components to the manifest object
	 */
	utils.bowerIterator = function(fpath) {
		
	};
	
	module.exports = {
		doNPMManifest: utils.npmIterator,
		getManifest: function() {
			return manifest;
		}
	}
	
})();


