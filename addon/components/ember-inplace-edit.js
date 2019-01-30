import Component from '@ember/component';
import layout from '../templates/components/ember-inplace-edit';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { later } from '@ember/runloop';

export default Component.extend({
    layout,
    type: 'input',
    disabled: false,
    originalValue: null,
    autoResize: false,

    isTypeInput: computed('type', function() {
        return this.get('type') === "input";
    }),

    displayPlaceholder: computed('text', function() {
        return isBlank(this.get('text'));
    }),

    keyUp: function(event) {
        if (event.keyCode === 13 && this.get('type') !== "textarea") {
            this.send('doneEditing');
        }

        if (event.keyCode === 27) {
            this.set('value', this.get('originalValue'));
            this.set('isEditing', false);
        }
    },

    mouseEnter: function() {
        this.$('.edit').removeClass('hide');
    },

    touchEnd: function() {
        this.send('startEditing');
    },

    mouseLeave: function() {
        this.$('.edit').addClass('hide');
    },

    focusOut: function() {
        /* Added if condition 
         * Assertion Failed: You modified "isEditing" twice on <dummy@component:ember-inplace-edit::ember286> in a single render.
         *It was rendered in "component:ember-inplace-edit" and modified in "component:ember-inplace-edit". 
         * This was unreliable and slow in Ember 1.x and is no longer supported. See https://github.com/emberjs/ember.js/issues/13948 for more details." 
         */
        if (arguments[0] && arguments[0].target && arguments[0].target.nodeName !== 'BUTTON') {
            this.send('doneEditing');
        }
    },

    handleFocus: function() {
        if (!this.get('autoResize')) {
            var height = this.$().css('height'),
                width = this.$().css('width');
        }

        later(this, function() {
            if (this.get('isEditing')) {
                this.set('originalValue', this.get('value'));

                if (this.get('type') === 'input') {
                    this.$('input').focus();
                } else {
                    if (this.get('autoResize')) {
                        this.$('textarea').focus();
                    } else {
                        this.$('textarea').css({ height: height, width: width }).focus();
                    }
                }
                //this.sendAction('on-activated', this.$(), this.get('model'));
            }
        });
    },

    actions: {
        startEditing: function() {
            if (this.get('disabled') === false) {
                this.set('isEditing', true);
                this.handleFocus();
            }
        },
        doneEditing: function() {
            if (this.get('isEditing') === true) {
                this.set('isEditing', false);
                if (this.get('action')) {
                    this.get('action')(this.get('model'), this.get('value'));
                }
            }
        }
    }
});