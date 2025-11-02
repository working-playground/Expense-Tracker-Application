export function validateBody(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request body",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
}

export function validateQuery(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Invalid query parameters",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
}

export function validateParams(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Invalid path parameters",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
}
