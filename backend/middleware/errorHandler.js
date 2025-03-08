export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || "Internal  server error";
  res.json({
    success: "false",
    statuscode: statusCode,
    message: errMessage,
  });
};
