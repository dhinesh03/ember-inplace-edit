import Ember from "ember";
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function nl2br(params) {
  let text = Ember.Handlebars.Utils.escapeExpression(params[0]),
      breakTag = '<br>';

  return htmlSafe((text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
}

export default helper(nl2br);
