/**
 *@desc Class that contains the basic structure for each dependency that will go into the manifest 
 */
module.exports = function(params, path) {
	this.name = params.name;
	this.version = [];	
	this.license = [];	
	this.url = [];		
	this.path = [];	
	
	this.add = function(params, path) {	
		if(this.version.indexOf(params.version) === -1) {
			this.version.push(params.version);
			if(params.licenses) {
				for(var l in params.licenses) {
					this.license.push((params.licenses[l] && params.licenses[l].type)?  params.licenses[l].type : (params.license[l] || 'Unspecified'));
				}
			} else {
				this.license.push((params.license && params.license.type)?  params.license.type : (params.license || 'Unspecified'));
			}
			this.url.push(params.hompage || (params.repository? params.repository.url : '') || 'Unspecified');
		}
		this.path.push(path);
	};
	
	this.match = function(name) {
		return this.name === name;
	};
	
	this.add(params, path);
	
};