/* eslint-disable */
/* global featureFile, scenarios, steps */
const Yadda = require('yadda');
const wd = require('wd');

function buildDriver() {
  require('source-map-support').install();
  return wd.promiseChainRemote({
    host: 'localhost',
    port: 4723,
  });
};

function setBaseSteps(library, device) {
  library.define(
    'a mobile app',
    function setWindowSize(done) {
      this.driver
      .init(device)
      .setImplicitWaitTimeout(3000)
      .then(() => done());
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

function buildYadda(library, device) {
  if (library === null || library === undefined) {
    throw new Error('step library has not been defined please write some steps');
  }
  Yadda.plugins.mocha.StepLevelPlugin.init();
  const features = new Yadda.FeatureFileSearch('features');
  const builtLibrary = setBaseSteps(library, device);
  const driver = buildDriver();
  require("./helpers/logging").configure(driver);
  return features
  .each(
    file => featureFile(
      file,
      (feature) => {
        const yadda = Yadda.createInstance(
          builtLibrary,
          {
            ctx: {},
            driver
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
