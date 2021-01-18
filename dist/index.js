const buildYadda = require('./lib/yadda-core');
const yaddaLibraryBuilder = require('./lib/yadda-library-builder');
const readScenariosFromFeatureFiles = require('./lib/yadda-featureDetails');

module.exports = {
  yaddaCore: buildYadda,
  yaddaLibrary: yaddaLibraryBuilder,
  countScenarios:readScenariosFromFeatureFiles
};
