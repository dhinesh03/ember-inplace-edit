import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('demo-input', {path: '/'});
  this.route('demo-textarea');
  this.route('demo-autoresize');
});

export default Router;
