import {assert} from 'chai';

export default function () {
  return this
  .when(
    'another element is clicked',
    async function anotherElementIsClicked() {
      const clickableElement = await this.driver.elementById(/*your element id*/);
      this.log('clickableElement', clickableElement);
      await clickableElement.click();
      assert.ok(true, this.step);
    }
  );
}
