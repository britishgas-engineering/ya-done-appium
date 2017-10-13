import {assert} from 'chai';

export default function () {
  return this
  .then(
    'a different element is displayed',
    async function anotherElementIsDisplayed() {
      await this.driver.sleep(3000);
      const logout = await this.driver.elementById(/*your element id*/);
      this.log('clickableElement', clickableElement);
      // assert properly this element is here
      assert.ok(true, this.step);
    }
  )
}
