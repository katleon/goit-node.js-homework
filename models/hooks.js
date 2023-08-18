export const handleMongooseError = (er, _, next) => {
  er.status = er.code === 11000 && er.name === "MongoServerError" ? 409 : 400;
  next();
};

export const handleRunValidators = function (next) {
  this.options.runValidators = true;
  next();
};
