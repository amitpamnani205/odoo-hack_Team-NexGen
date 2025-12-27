export const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = {
    success: success,
    message: message
  };

  if (data) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

