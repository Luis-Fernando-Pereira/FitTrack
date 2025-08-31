const logger = require('../logger');

const logRequests = (req, res, next) => {
  res.on('finish', () => {
    const { method, originalUrl } = req;
    const status = res.statusCode;

    if (status >= 400) {
      logger.error(`${method} ${originalUrl} - ${status}`);
    } else {
      logger.info(`${method} ${originalUrl} - ${status}`);
    }
  });
  next();
};

module.exports = logRequests;
