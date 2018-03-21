import format from 'date-fns/format';
import curryRight from 'lodash/curryRight';

// Have to explicitly set "options" to undefined
const formatToEpoch = curryRight(format)(undefined)('x');

export function formatDate(date) {
  return parseInt(formatToEpoch(date));
}
