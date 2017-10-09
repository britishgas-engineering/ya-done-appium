# ya-done-appium

### THIS IS A WORK IN PROGRESS (BETA VERSION, THERE MAY STILL BE ISSUES. PLEASE RAISE)

### From Version 0.3.0
- set up works with async and await ensure you have _babel-polyfill_
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
Using the example project provided.

**sample project structure**
```
│   index.js    
└───steps
│   └───given
│   └───when
│   └───then
└───features
    │ clever.feature
```

**index.js (project level)**
```js
import { yaddaCore } from 'ya-done-appium';
import steps from './steps';

/*
  configuration for device
  example device configs can be seen here :
  https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
*/

const device = {
    platformName: 'Android',
    platformVersion: '7.0',
    deviceName: 'device',
    app:  // Add Android APK path here
  };

yaddaCore(steps, device); // add additional true flag for global logging
```

**hello.feature**
```feature
Feature: Make it work

Scenario: Cleverness
  Given I think I am clever
  When I am clever
  Then I am clever

```

**index.js  (steps level)**
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
    'I think I am clever',
    (next) => {
      assert.ok(true, this.step)
      next();
    }
  )
  .when(
    'I am clever',
    (next) => {
      assert.ok(true, this.step)
      next();
    }
  )
  .then(
    'I am clever',
    (next) => {
      assert.ok(true, this.step)
      next();
    }
  );
export default runTests();
```

**install and run the project**
```js
npm i
npm test
```
