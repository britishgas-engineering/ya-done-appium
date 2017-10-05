# ya-done-appium

  **Ready to use yadda BBD test framework with appium and chai**  

[![travis build passing](https://travis-ci.org/britishgas-engineering/ya-done.svg?branch=master)](https://travis-ci.org/britishgas-engineering/ya-done-appium)

```js
npm i ya-done-appium --save
```
The aim of this package is to build a simple configuration for 'yadda' to enable QA test engineers to productively build test projects for web projects using JavaScript.

ya-done configures 'yadda' with chai with 'appium'. 'yadda' has been created with two context properties.  'appium' can be accessed via the property 'driver' additionally a property of 'ctx', type object, has been added to allow the passing of data between steps.

### Technologies Used
- Pre-configured  _[yadda](https://github.com/acuminous/yadda)_
- Pre-configured  _[chai](http://chaijs.com/)_

### Default steps
ya-done-appium has preconfigured "set-up" and "tear down" steps.
- **end the test** _(calls quit on appium)_

These steps are added to the yadda library by default and are used in the example project and seen below.

### Configuration
ya-done exposes "yaddaCore" which requires a step library to run.  The web-browser to be used for testing can be defined by either a string or configuration object. When using a configuration object the window size can also be set, more configuration option may become available as issues are found or raised.

```js
import { yaddaCore } from 'ya-done';
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
│   │ index.js
└───features
    │ hello.feature
```

**index.js (project level)**
```js
import { yaddaCore } from 'ya-done';
import steps from './steps';
yaddaCore(steps);
```

**hello.feature**
```feature
Feature: ya-done example

    Scenario: appium is simple with ya-done
      Given a web browser
      When the browser navigates to github
      Then the headers should not be hello world
      And end the test
```

**index.js  (steps level)**
```js
import { yaddaLibrary } from 'ya-done';

const runTests = () => yaddaLibrary()
  .when(
    'the browser navigates to github',
    function loadGithub(next) {
      this.driver.get('http://github.com');
      next();
    }
  )
  .then(
    'the headers should not be hello world',
    (next) => {
      expect('#site-container h1.heading')
      .dom
      .to
      .not
      .contain
      .text('hello world');

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
