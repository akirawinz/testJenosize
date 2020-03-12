const { LogicalException } = require("@adonisjs/generic-exceptions");

class CustomException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle(error, { response }) {
    return response.status(error.status).json({
      status: error.status,
      success: false,
      message: error.message
    });
  }
}

module.exports = CustomException;
