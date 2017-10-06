import {assert} from 'chai';

export default function () {
  return this
  .then(
    'I am clever',
    (next) => {
      assert.ok(true, this.step)
      next();
    }
  );
}
