const mockPromise = jest.fn().mockReturnThis();
const mockPublish = jest.fn().mockReturnValue({ promise: mockPromise });
const SNS = jest.fn().mockImplementation(() => ({
  publish: mockPublish
}));

module.exports = SNS;
module.exports.mockPublish = mockPublish;
module.exports.mockPromise = mockPromise;
