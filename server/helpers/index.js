import _ from 'lodash';

export default (app) => ({
  route(name) {
    return app.reverse(name);
  },
  _,
});