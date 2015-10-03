var main  = require('./lib/main.js');

main.doNPMManifest(process.cwd());
main.doBowerManifest(process.cwd());

console.log(main.getManifest());