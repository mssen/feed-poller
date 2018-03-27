module.exports.main = (event) => {
  event.Records.forEach((rec) => console.log(rec.Sns));
};
