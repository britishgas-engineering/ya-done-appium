import {assert} from 'chai';

export default function () {
  return this
  .given(
    'I think I am clever',
    (next) => {
      assert.ok(true, this.step)
      next();
    }
  );
}
