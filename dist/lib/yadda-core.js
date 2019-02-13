/* eslint-disable */
/* global featureFile, scenarios, steps */
const Yadda = require('yadda');
const wd = require('wd');

function buildDriver(server) {
    const configServer = server || {
    host: 'localhost',
    port: 4723,
  };
  return wd.promiseChainRemote(configServer);
};

function setBaseSteps(library, device, deviceLogs) {
  library.define(
    'a mobile app',
      function setWindowSize(done) {
       this.driver.init(device).then((built) => {
         if (deviceLogs === true) {
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

function buildYadda(library, device, server, logVerbose, deviceLogs) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch('features');
  const builtLibrary = setBaseSteps(library, device, deviceLogs);
  if (logVerbose) {
    require("./log").configure(driver);
  }
  return features
  .each(
    file => featureFile(
      file,
      (feature) => {
        const yadda = Yadda.createInstance(
          builtLibrary,
          {
            ctx: {},
            driver: buildDriver(server),
            log: (label, data) => console.log(label, data)
          }
        );

        scenarios(
          feature.scenarios,
          (scenario) => {
            steps(
              scenario.steps,
              (step, done) => {
                yadda.run(step, done);
              }
            );
          }
        );
      }
    )
  );
}

module.exports = buildYadda;
