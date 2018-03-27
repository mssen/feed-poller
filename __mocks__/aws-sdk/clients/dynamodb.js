const __promise = jest.fn().mockReturnThis();
const __scan = jest.fn();
__scan.mockReturnValue({ promise: __promise });
const __update = jest.fn();
__update.mockReturnValue({ promise: __promise });
const __put = jest.fn();
__put.mockReturnValue({ promise: __promise });
const DynamoDB = {
  DocumentClient: jest.fn().mockImplementation(() => ({
    scan: __scan,
    update: __update,
    put: __put
  }))
};

module.exports = DynamoDB;
module.exports.__scan = __scan;
module.exports.__update = __update;
module.exports.__put = __put;
module.exports.__promise = __promise;
