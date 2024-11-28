const ERROR_CODE = {
  CONNECTION_REFUSED: 102,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  CONFLICT: 409,
};

class NotFoundError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "unauthorizedError";
  }
}

module.exports = { NotFoundError, UnauthorizedError };
