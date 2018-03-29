const successUrl = 'avalidurl';
const failureUrl = 'abadurl';

module.exports.successUrl = successUrl;
module.exports.failureUrl = failureUrl;

module.exports.sendFeed = jest.fn().mockResolvedValue('3');
// .mockImplementation(
//   (url) =>
//     url === failureUrl
//       ? Promise.reject({ error: 'This failed' })
//       : Promise.resolve()
// );
