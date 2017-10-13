import {assert} from 'chai';

export default function () {
  return this
  .given(
    'an element is displayed on the device',
    async function anElementIsDisplayed() {
      const clickableElement = await this.driver.elementById(/*your element id*/);
      this.log('clickableElement', clickableElement);
      await clickableElement.click();
      // assert properly this element is here
      assert.ok(true, this.step);
    }
  );
}
