const { formatDate } = require('./util');

describe('Util', () => {
  it('should format the date correctly', () => {
    const date = 'Mon, 26 Mar 2018 21:48:22 GMT';
    expect(formatDate(date)).toEqual(1522100902000);
  });
});
