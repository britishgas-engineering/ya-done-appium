import { yaddaCore } from 'ya-done-appium';
import steps from './steps';

const localIos = {
  platformName: 'iOs',
  platformVersion: '11.0',
  deviceName: 'iPhone 7 Plus',
  app: // Add local ios ipa here
};

const localAndroid = {
  platformName: 'Android',
  platformVersion: '7.0',
  deviceName: 'device',
  app:  // Add local Android APK path here
};

const remoteIos = {
  platformName: 'iOs',
  platformVersion: '11.0',
  deviceName: 'iPhone 7 Plus',
  app: `sauce-storage:${your - ipa}`
};

const remoteIos = {
  platformName: 'iOs',
  platformVersion: '11.0',
  deviceName: 'iPhone 7 Plus',
  app: `sauce-storage:${your - ipa}`
};

const remoteAndroid = {
  'appium-version': '1.6.5',
  platformName: 'Android',
  platformVersion: '6.0',
  deviceName: 'Android Emulator',
  app: `sauce-storage:${your - apk}`
};

// enable verbose logging in the console
const verboseLogging = true;

// server config saucelabs as example
const server = {
  host: 'ondemand.saucelabs.com',
  port: 80,
  auth: `${SAUCELABS_USER}:${SAUCELABS_AUTH}`,
};



// yaddaCore(steps, localIos, undefined, verboseLogging);
// yaddaCore(steps, localAndroid, undefined, verboseLogging);
// yaddaCore(steps, remoteIos, server, verboseLogging);
// yaddaCore(steps, remoteAndroid, server, verboseLogging);
