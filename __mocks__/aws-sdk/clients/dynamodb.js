const mockPromise = jest.fn().mockReturnThis();
const mockScan = jest.fn();
mockScan.mockReturnValue({ promise: mockPromise });
const mockUpdate = jest.fn();
mockUpdate.mockReturnValue({ promise: mockPromise });
const mockPut = jest.fn();
mockPut.mockReturnValue({ promise: mockPromise });
const DynamoDB = {
  DocumentClient: jest.fn().mockImplementation(() => ({
    scan: mockScan,
    update: mockUpdate,
    put: mockPut
  }))
};

module.exports = DynamoDB;
module.exports.mockScan = mockScan;
module.exports.mockUpdate = mockUpdate;
module.exports.mockPut = mockPut;
module.exports.mockPromise = mockPromise;
