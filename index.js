(function() {
	'use strict';
	var fs = require('fs');
	var path = require('path');
	
	var utils = {};
	
	/**
	 * @desc Returns all dependencies speicifed in the fileData
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
				fileData = require(path.join(fPath, 'package.json'));
			} else {
				fileData = require(path.join(fPath, 'bower.json'));
			}
			
			return fileData;
		} catch(exp) {
			console.log('Invalid package.json/bower.json file at ', fPath);
			return {};
		}
	}
	
	/**
	 * @desc Extracts the needed info from the package
	 * @params { object } Config file contents
	 * @returns { object }
	 */
	utils.collectPackageData = function(fileData) {
		
	}
	
})();


