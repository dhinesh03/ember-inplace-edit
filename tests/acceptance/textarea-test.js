import { module, test } from 'qunit';
import { visit, fillIn, triggerEvent, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Text area', function(hooks) {
    setupApplicationTest(hooks);

    test('edit text', async function(assert) {
        await visit('/demo-textarea');
        await click('.multi-line-text-wrapper .edit-box');
        await fillIn('.multi-line-text-wrapper textarea', 'Updated content');
        await triggerEvent('.multi-line-text-wrapper textarea', 'blur');
        assert.equal(find('.multi-line-text-wrapper .edit-box').innerText.trim(), 'Updated content', 'The text has been updated correctly');
    });
});
