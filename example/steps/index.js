import { yaddaLibrary } from 'ya-done-appium';
import _given from './given';
import _when from './when';
import _then from './then';

const bootstrap = () => {
  const given = _given.call(yaddaLibrary());
  const when = _when.call(given);
  return _then.call(when);
};

export default bootstrap();
