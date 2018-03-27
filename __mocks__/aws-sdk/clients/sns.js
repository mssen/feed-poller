const __promise = jest.fn().mockReturnThis();
const __publish = jest.fn().mockReturnValue({ promise: __promise });
const SNS = jest.fn().mockImplementation(() => ({
  publish: __publish
}));

module.exports = SNS;
module.exports.__publish = __publish;
module.exports.__promise = __promise;
