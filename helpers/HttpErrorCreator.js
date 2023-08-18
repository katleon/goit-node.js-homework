const messages = {
  400: "Bad request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found!",
  409: "Conflict",
};

function HttpErrorCreator(status, message = messages[status]) {
  const er = new Error(message);
  er.status = status;
  return er;
}
export default HttpErrorCreator;
