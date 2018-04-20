import format from 'date-fns/esm/fp/format';
import flow = require('lodash/fp/flow');

export const formatDate: (date: string | number) => number = flow(
  format('x'),
  parseInt
);
