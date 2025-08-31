const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, errors } = format;

const logger = createLogger({
    level: 'info', 
    format: combine(
        timestamp(),
        errors({stack: true}),
        json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error', handleExceptions: true }),
        new transports.File({ filename: 'logs/combined.log'}),
        new transports.Console(),
        
    ]
});

logger.on('error', (err) => {
  console.error('Logger error:', err);
});


module.exports = logger;