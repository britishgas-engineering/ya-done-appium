import {yaddaCore} from 'ya-done-appium';
import steps from './steps';

const device = {
    platformName: 'Android',
    platformVersion: '7.0',
    deviceName: 'device',
    app: // Add Android APK path here
  };


yaddaCore(steps,device);
