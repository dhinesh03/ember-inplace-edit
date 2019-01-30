import { module, test } from 'qunit';
import { visit, fillIn, triggerEvent, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | input', function(hooks) {
  setupApplicationTest(hooks);

  test('show edit button on hover', async function(assert) {
    await visit('/');
    assert.equal(find('.examples-header ~ .row .edit').classList.contains('hide'), true);
    await triggerEvent('.examples-header ~ .row .edit-box', 'mouseover');
    assert.equal(find('.examples-header ~ .row .edit').classList.contains('hide'), false);
  });
  
  test('show input box when click on edit button', async function(assert) {
    await visit('/');
    await click('.examples-header ~ .row .edit button');
    await assert.notEqual(find('.examples-header ~ .row input'), false);
  });
  
  test('edit text', async function(assert) {
    await visit('/');
    await click('.examples-header ~ .row .edit button');
    await fillIn('.examples-header ~ .row input', 'Updated content');
    await triggerEvent('.examples-header ~ .row input', 'blur');
    await assert.equal(find('.examples-header ~ .row .edit-box').innerText.trim(), 'Updated content');
  });
});
