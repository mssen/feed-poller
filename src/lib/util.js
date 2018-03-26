const format = require('date-fns/fp/format');
const flow = require('lodash/fp/flow');

module.exports.formatDate = flow(format('x'), parseInt);
