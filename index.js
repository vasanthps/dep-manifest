var main  = require('./lib/main.js');

main.doNPMManifest(process.cwd());

console.log(main.getManifest());