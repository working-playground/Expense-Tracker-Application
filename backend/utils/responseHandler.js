export function successResponse(res, message, data = {}) {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

export function createdResponse(res, message, data = {}) {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(res, message, status = 400, details = []) {
  return res.status(status).json({
    success: false,
    message,
    error: { details },
  });
}
