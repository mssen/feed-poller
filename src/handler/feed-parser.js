module.exports.main = (event, context, callback) => {
  event.Records.forEach((rec) => console.log(rec.Sns));
};
