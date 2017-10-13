# ya-done-appium

### From Version 0.3.0
- to use async and await ensure you have _[babel-polyfill](https://www.npmjs.com/package/babel-polyfill)_
- added log the _this_ available in steps
- added global logging availability

  **Ready to use yadda BBD test framework with appium and chai**  

```js
npm i ya-done-appium --save
```
The aim of this package is to build a simple configuration for 'yadda' to enable QA test engineers to productively build test projects for mobile projects using JavaScript.

ya-done configures 'yadda' with chai with 'appium'. 'yadda' has been created with two context properties.  'appium' can be accessed via the property 'driver' additionally a property of 'ctx', type object, has been added to allow the passing of data between steps.

### Technologies Used
- Pre-configured  _[yadda](https://github.com/acuminous/yadda)_
- Pre-configured  _[chai](http://chaijs.com)_
- Pre-configured  _[appium](http://appium.io)_

### Default steps
ya-done-appium has preconfigured "set-up" and "tear down" steps.
- **end the test** _(calls quit on appium)_

These steps are added to the yadda library by default and are used in the example project and seen below.

### Configuration
ya-done exposes "yaddaCore" which requires a step library to run.  

```js
import { yaddaCore } from 'ya-done-appium';
import steps from './steps';
/* configure */
yaddaCore(steps);

/* further configurations to follow*/
```

### Example use
For more information please look at the [example project](https://github.com/britishgas-engineering/ya-done-appium/tree/master/example).

**package.json script**
```json
{
  "scripts": {
    "test": "mocha index.js --require babel-polyfill --compilers js:babel-register inlineAssets=true --timeout 60000"
  }
}
```

**install and run the project**
```js
npm i
npm test
```

**sample project structure**
```
│   index.js    
└───steps
│   └───given
│   └───when
│   └───then
└───features
    │ sample.feature
```
**SAMPLE FEATURE**
```feature
Feature: Sample feature

Scenario: Sample
  Given an element is displayed on the device
  When another element is clicked
  Then a different element is displayed
```

**STEPS LIBRARY**
```js
import { yaddaLibrary } from 'ya-done-appium';

/*
  this works with appium, we have not yet attached the driver
  in a test but that should work, fingers crossed, ;)
  when we are at that stage this will be updated
  (script below is a concatenation of the given when then files)
*/

const runTests = () => yaddaLibrary()
.given(
  'an element is displayed on the device',
  async function anElementIsDisplayed() {
    const clickableElement = await this.driver.elementById(/*your element id*/);
    this.log('clickableElement', clickableElement);
    await clickableElement.click();
    // assert properly this element is here
    assert.ok(true, this.step);
  }
)
.when(
  'another element is clicked',
  async function anotherElementIsClicked() {
    const clickableElement = await this.driver.elementById(/*your element id*/);
    this.log('clickableElement', clickableElement);
    await clickableElement.click();
    assert.ok(true, this.step);
  }
)
.then(
  'a different element is displayed',
  async function anotherElementIsDisplayed() {
    await this.driver.sleep(3000);
    const logout = await this.driver.elementById(/*your element id*/);
    this.log('clickableElement', clickableElement);
    // assert properly this element is here
    assert.ok(true, this.step);
  }
);
export default runTests();
```
### index.js (project level)

**[EXAMPLE DEVICE CONFIGS](https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js)**

**local ios configuration**
```js
import { yaddaCore } from 'ya-done-appium';
import steps from './steps';

// device to test on
const localIos = {
  platformName: 'iOs',
  platformVersion: '11.0',
  deviceName: 'iPhone 7 Plus',
  app: // Add local ios ipa here
};

// no server is required for local (exclude or 'undefined' for localhost)
const server = undefined;

// enable verbose logging in the console (this is not required)
const verboseLogging = true;

yaddaCore(steps, localIos, server, verboseLogging);
```

**local android configuration**
```js
import { yaddaCore } from 'ya-done-appium';
import steps from './steps';

// device to test on
const localAndroid = {
  platformName: 'Android',
  platformVersion: '7.0',
  deviceName: 'device',
  app:  // Add local Android APK path here
};

// no server is required for local (exclude or 'undefined' for localhost)
const server = undefined;

// enable verbose logging in the console (this is not required)
const verboseLogging = true;

yaddaCore(steps, localAndroid, server, verboseLogging);
```

**saucelabs ios configuration**
```js
import { yaddaCore } from 'ya-done-appium';
import steps from './steps';

// device to test on
const remoteIos = {
  platformName: 'iOs',
  platformVersion: '11.0',
  deviceName: 'iPhone 7 Plus',
  app: `sauce-storage:${your-ipa}`
};

// enable verbose logging in the console
const verboseLogging = true;

// server config saucelabs as example
const server = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  auth: `${SAUCELABS_USER}:${SAUCELABS_AUTH}`,
};

yaddaCore(steps, remoteIos, server, verboseLogging);
```

**saucelabs android configuration**
```js
import { yaddaCore } from 'ya-done-appium';
import steps from './steps';

// device to test on
const remoteAndroid = {
  'appium-version': '1.6.5',
  platformName: 'Android',
  platformVersion: '6.0',
  deviceName: 'Android Emulator',
  app: `sauce-storage:${your-apk}`
};

// enable verbose logging in the console
const verboseLogging = true;

// server config saucelabs as example
const server = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  auth: `${SAUCELABS_USER}:${SAUCELABS_AUTH}`,
};

yaddaCore(steps, remoteAndroid, server, verboseLogging);
```
