/* eslint-disable */
/* global featureFile, scenarios, steps */
const Yadda = require('yadda');
const wd = require('wd');
var mocha = require('mocha');

function buildDriver(server) {
    const configServer = server || {
    host: 'localhost',
    port: 4723,
  };
  return wd.promiseChainRemote(configServer);
};

function setBaseSteps(library, device) {
  library.define(
    'a mobile app',
      function setWindowSize(done) {
       this.driver.init(device).then((built) => {
         if (device.deviceLogs) {
         this.log('set-up device', built);
         }
         done();
       });
    }
  )
  .define(
    'end the test',
    function endTest() {
      this.driver
      .quit();
    }
  );
  return library;
}

function buildYadda(library, device, featurePath, server, logVerbose) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch(featurePath);
  const builtLibrary = setBaseSteps(library, device);
  if (logVerbose) {
    require("./log").configure(driver);
  }
  const yadda = Yadda.createInstance(
    builtLibrary,
    {
      ctx: {},
      driver: buildDriver(server),
      log: (label, data) => console.log(label, data)
    }
  );
  return features
  .each(
    file => featureFile(
      file,
      (feature) => {
        scenarios(
          feature.scenarios,
          (scenario) => {
            steps(
              scenario.steps,
              (step, done) => {
                yadda.run(step, { mocha: this }, done);
              }
            );
          }
        );
      }
    )
  );
}

module.exports = buildYadda;
